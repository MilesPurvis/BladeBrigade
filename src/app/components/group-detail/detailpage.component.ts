/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Group} from "../../models/group.model";
import {Zone} from "../../models/zone.model";
import {GroupDalService} from "../../services/group-dal.service";
import {Drone} from "../../models/drone.model";
import {GeoService} from "../../services/geo.service";

declare const H: any;

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent {
  geoService = inject(GeoService);
  activatedRoute = inject(ActivatedRoute)
  dal = inject(GroupDalService)
  eventZone: Zone = new Zone("", 0, 0);
  group: Group = new Group("", "", "", 0, new Date(), [], this.eventZone);
  zone: Zone = new Zone("", 0, 0)
  lat: any;
  lng: any;
  drones: Drone[] = [];


  constructor() {

    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.dal.select(id).then(data => {
      if (data) {
        this.group = data;
        this.drones = this.group.droneArray;
        this.getAddress()

      } else {
        console.error('Event/Group not found');
      }
    }).catch(e => console.error(e.message))


  }

  setGroupValues(data: any) {
    this.group = data;
  }

  getAddress() {
    this.geoService.getCurrentLocation().then((data) => {
      return this.geoService.getLocationByAddress(this.group.eventZone.address)
    }).then(data => {
      this.lat = data.lat
      this.lng = data.lng
      this.showMap()
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


    var circle = new H.map.Circle({lat: this.lat, lng: this.lng}, this.group.eventZone.radius, {style: customStyle});

    map.addObject(circle);
  }


  formatDate(inputDate: string): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];

    return `${month} ${parseInt(day)}, ${year}`;
  }
}
