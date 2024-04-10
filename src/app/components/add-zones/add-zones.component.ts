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

  zone:Zone = new Zone("123 street","S",5)

  position: any;
  error: any;

  lat: any;
  lon: any;

  selectedOption: string;
  mapIcon: any;

  constructor() {
    this.selectedOption = ""
  }

  onAddClick(){
    this.dal.insert(this.zone).then((data)=>{
      console.log(data);
      alert("Record added successfully")
    }).catch(e=>{
      console.error("Error" + e.message)
    })
  }
  onOptionChange(event: any) {
    this.selectedOption = event.target.value;

    if (this.selectedOption == "none") {
      this.mapIcon = new H.map.Icon('assets/img/default.png');
    }else if(this.selectedOption == "S"){
      this.mapIcon = new H.map.Icon('assets/img/SafeZone.png');
    }else if(this.selectedOption == "L"){
      this.mapIcon = new H.map.Icon('assets/img/SafeZone2.png');
    }

    this.showMap()
  }

  getLocationOnclick() {
    this.geoService.getCurrentLocation().then((data) => {
      console.log(data)
      this.position = data;
      this.lat = data.lat;
      this.lon = data.lon;
      this.error = "";
      this.showMap();
    }).catch(err => {
    })
  }

  public showMap() {
    console.log("Showing Map: ")
    document.getElementById("mapContainer")!.innerHTML = '';

    //init the platform obj
    var platform = new H.service.Platform({
      'apikey': 'cU638kKX9v40v8qGZfXBEwk8OFEBSoPKIz3lyA03o_g'
    })

    var mapTypes = platform.createDefaultLayers();

    var options = {
      zoom: 14,
      center: {
        lat: this.lat, lng: this.lon
      }
    };

    var map = new H.Map(
      document.getElementById('mapContainer'),
      mapTypes.vector.normal.map,
      options
    );


    var icon = this.mapIcon

    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lon
    }, {icon: icon})

    //add marker
    map.addObject(marker);
  }


}
