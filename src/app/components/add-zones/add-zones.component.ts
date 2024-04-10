import {Component, inject} from '@angular/core';
import {GeoService} from "../../services/geo.service";

declare const H:any;
@Component({
  selector: 'app-add-zones',
  standalone: true,
  imports: [],
  templateUrl: './add-zones.component.html',
  styleUrl: './add-zones.component.css'
})
export class AddZonesComponent {
geoService = inject(GeoService);
position:any;
error:any;

lat:any;
lon:any;

getLocationOnclick(){
  this.geoService.getCurrentLocation().then((data)=>{
    console.log(data)
    this.position = data;
    this.lat = data.lat;
    this.lon = data.lon;
    this.error = "";
    this.showMap();
  }).catch(err=>{})
}

public showMap(){
  console.log("Showing Map: ")
  document.getElementById("mapContainer")!.innerHTML='';

  //init the platform obj
  var platform = new H.service.Platform({
    'apikey':'cU638kKX9v40v8qGZfXBEwk8OFEBSoPKIz3lyA03o_g'
  })

  var mapTypes = platform.createDefaultLayers();

  var options = {
    zoom:14,
    center:{
      lat:this.lat,lng:this.lon
    }
  };

  var map = new H.Map(
    document.getElementById('mapContainer'),
    mapTypes.vector.normal.map,
    options
  );

  var md = new H.map.Icon('assets/img/SafeZone2.png')

  var icon = new H.map.Icon('assets/img/SafeZone.png');

  var marker = new H.map.Marker({
    lat:this.lat,lng:this.lon
  },{icon:icon})

  //add marker
  map.addObject(marker);
}
}
