import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Group} from "../../models/group.model";
import {Zone} from "../../models/zone.model";
import {GroupDalService} from "../../services/group-dal.service";
import {Drone} from "../../models/drone.model";

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
  lat: any;
  lng: any;
  drones:Drone[] = [];

  constructor(private dal: GroupDalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.dal.select(Number(this.ID)).then(data => {
        if (data){
          this.group = data;
          this.drones = this.group.droneArray;
        } else {
          console.error('Event/Group not found');
        }
      }).catch(e => {
        console.error(e.message)
      })
    });
  }

  setGroupValues(data:any) {
    this.group = data;
  }

}
