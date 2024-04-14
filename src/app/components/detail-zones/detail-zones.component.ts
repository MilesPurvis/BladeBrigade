/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ZoneDalService} from "../../services/zone-dal.service";
import {Zone} from "../../models/zone.model";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GeoService} from "../../services/geo.service";

declare const H: any;

@Component({
  selector: 'app-detail-zones',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './detail-zones.component.html',
  styleUrl: './detail-zones.component.css'
})
export class DetailZonesComponent {
  zone: Zone = new Zone("nozone", 0, 0)
  activatedRoute = inject(ActivatedRoute)
  dal = inject(ZoneDalService)
  router = inject(Router)
  geoService = inject(GeoService);
  position: any;
  error: any;
  radiusInMetres: any = 0;
  lat: any;
  lng: any;
  MIN_RADIUS: number = 100;
  MAX_RADIUS: number = 5000;
  MAX_DRONES: number = 10;
  MIN_DRONES: number = 1;

  getRadius(e: any) {
    this.radiusInMetres = e.target.value;
    this.showMap()
  }

  getLocationOnclick() {
    this.geoService.getCurrentLocation().then((data) => {
      console.log(data)
      this.position = data;
      this.lat = data.lat;
      this.lng = data.lng;
      this.error = "";
      this.showMap();
      return this.geoService.getLocationLatLon(this.lat, this.lng)
    }).then(data => {

      this.zone.address = data;
    }).catch(err => {
    })
  }

  getAddress() {
    this.geoService.getCurrentLocation().then((data) => {
      return this.geoService.getLocationByAddress(this.zone.address)
    }).then(data => {
      this.lat = data.lat
      this.lng = data.lng
      this.showMap()
    })
  }


  constructor() {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then(data => {
      this.zone = data;
      this.getAddress()
      this.showMap()

    }).catch(e => {
      console.error(e.message)
    })
  }

  public showMap() {
    document.getElementById("mapContainer")!.innerHTML = '';

    var mapTypes = this.geoService.hMapPlatform.createDefaultLayers();

    var options = {
      zoom: 13,
      center: {
        lat: this.lat, lng: this.lng
      }
    };

    let mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
      mapContainer.style.width = 'auto';
      mapContainer.style.height = '400px';
    }


    var map = new H.Map(
      mapContainer,
      mapTypes.vector.normal.map,
      options
    );

    var customStyle = {
      strokeColor: 'rgb(92,124,152)',
      fillColor: 'rgba(163,208,80,0.25)',
      lineWidth: 3,
      lineCap: 'square',
      lineJoin: 'bevel'
    };


    var circle = new H.map.Circle({lat: this.lat, lng: this.lng}, this.zone.radius, {style: customStyle});

    map.addObject(circle);
  }


  onUpdateClick() {
    this.dal.update(this.zone).then((data) => {
      console.log(data)
      alert("Record Updated Success");
      this.router.navigate(['/showZones'])
    }).catch(e => {
      console.error(e.message)
    })
  }

  onDeleteClick() {
    if (confirm(`Are you sure you want to delete zone id(${this.zone.id}) - ${this.zone.address}`)) {
      this.dal.delete(this.zone).then(data => {
        this.router.navigate(['/showZones'])
      }).catch(e => {
        console.error(e.message)
      })
    } else {
      alert("Zone delete aborted!")
    }

  }

}
