import {Component, inject} from '@angular/core';
import {GeoService} from "../../services/geo.service";
import {FormsModule} from "@angular/forms";
import {ZoneDalService} from "../../services/zone-dal.service";
import {Zone} from "../../models/zone.model";

declare const H: any;

@Component({
  selector: 'app-add-zones',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-zones.component.html',
  styleUrl: './add-zones.component.css'
})
export class AddZonesComponent {
  geoService = inject(GeoService);
  dal = inject(ZoneDalService)

  zone: Zone = new Zone("", 0, 0)

  position: any;
  error: any;
  radiusInMetres:any;

  lat: any;
  lng: any;

  mapIcon: any;

  constructor() {
  }

  onAddClick() {
    this.dal.insert(this.zone).then((data) => {
      console.log(data);
      alert("Record added successfully")
    }).catch(e => {
      console.error("Error" + e.message)
    })
  }

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


  public showMap() {
    console.log("Showing Map: ")
    document.getElementById("mapContainer")!.innerHTML = '';

    var mapTypes = this.geoService.hMapPlatform.createDefaultLayers();

    var options = {
      zoom: 13.5,
      center: {
        lat: this.lat, lng: this.lng
      }
    };

    var map = new H.Map(
      document.getElementById('mapContainer'),
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
    var circle = new H.map.Circle({lat: this.lat, lng: this.lng}, this.radiusInMetres,{style:customStyle});

    map.addObject(circle);
  }


}
