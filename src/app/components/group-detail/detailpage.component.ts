import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Drone} from "../../models/drone.model";
import {Group} from "../../models/group.model";
import {DroneDalService} from "../../services/drone-dal.service";
import {Zone} from "../../models/zone.model";

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

  constructor(private dal: DroneDalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.dal.select(Number(this.ID)).then(data => {
        if (data){
          this.setGroupValues(data);
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
