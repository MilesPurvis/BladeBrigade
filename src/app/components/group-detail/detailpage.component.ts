import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Drone} from "../../models/drone.model";
import {Group} from "../../models/group.model";
import {DroneDalService} from "../../services/drone-dal.service";
import {Zone} from "../../models/zone.model";
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

  ID:number = 0;
  eventZone: Zone = new Zone("", 0, 0);
  group:Group = new Group("", "", "", 0, new Date(), [], this.eventZone);
  zone: Zone = new Zone("", 0, 0)
  geoService = inject(GeoService);
  radiusInMetres:any = 0;
  lat: any;
  lng: any;

  constructor(private dal: DroneDalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.dal.select(Number(this.ID)).then(data => {
        if (data){
          this.setGroupValues(data);

          this.getAddress();
          this.showMap();
          this.getRadius(this.eventZone.radius);
        } else {
          console.error('Event/Group not found');
        }
      }).catch(e => {
        console.error(e.message)
      })
    });
  }

  getAddress() {
    this.geoService.getCurrentLocation().then((data) => {
      return this.geoService.getLocationByAddress(this.eventZone.address)
    }).then(data => {
      this.lat = data.lat
      this.lng = data.lng
      this.showMap()
    })
  }
  getRadius(e: any) {
    this.radiusInMetres = e.target.value;
    this.showMap()
  }

  setGroupValues(data:any) {
    this.group = data;
  }

  public showMap() {
    document.getElementById("mapContainer")!.innerHTML = '';

    var mapTypes = this.geoService.hMapPlatform.createDefaultLayers();

    var options = {
      zoom: 13.5,
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


    var circle = new H.map.Circle({lat: this.lat, lng: this.lng}, this.radiusInMetres,{style:customStyle});

    map.addObject(circle);
  }

}
