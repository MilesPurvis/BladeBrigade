import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Group} from "../../models/group.model";
import {Zone} from "../../models/zone.model";
import {Drone} from "../../models/drone.model";
import {ZoneDalService} from "../../services/zone-dal.service";
import {DroneDalService} from "../../services/drone-dal.service";
import { FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {isEmpty} from "rxjs";
import {GroupDalService} from "../../services/group-dal.service";


@Component({
  selector: 'app-add-groups',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './add-groups.component.html',
  styleUrl: './add-groups.component.css',

})
export class AddGroupsComponent {


  zoneList: Zone[] = []
  droneList: Drone[] = []
  listOfDrones: Drone[] = [];
  addedDrones: Drone[] = [];
  zone: Zone = new Zone("", 0, 0);
  zoneDal = inject(ZoneDalService)
  droneDal = inject(DroneDalService)
  groupDal = inject(GroupDalService)
  router = inject(Router)
  minDate = new Date().toISOString().split('T')[0];
  today:Date = new Date()
  inValid = "Invalid Date"
  empty:string = ""


  group: Group = new Group("", "", "", 0,new Date(""), [], new Zone("", 0, 0))

  constructor() {
    this.showAll()

  }

  showAll() {
    //Show Zones
    this.zoneDal.selectAll().then(data => {
      this.zoneList = data;
    }).catch(e => {
      console.error(e)
      this.zoneList = [];
    })

    //Show Drones
    this.droneDal.selectAll().then(data => {
      this.droneList = data;
      this.listOfDrones = this.droneList
    }).catch(e => {
      console.error(e)
      this.droneList = [];
    })

  }

  protected readonly Zone = Zone;
  protected readonly Drone = Drone;

  addDroneToEvent(drone: Drone) {
    this.addedDrones.push(drone)
    this.listOfDrones = this.droneList.filter(drone => !this.addedDrones.includes(drone));
    this.group.droneArray = this.addedDrones
    console.log(this.group.droneArray.length)

  }

  removeDroneFromEvent(droneToRemove: Drone) {
    this.addedDrones = this.addedDrones.filter(drone => drone !== droneToRemove);

    // Update the listOfDrones to include the removed drone
    this.listOfDrones = this.droneList.filter(drone => !this.addedDrones.includes(drone));
    this.group.droneArray = this.addedDrones
  }

  addEventClick() {
    this.groupDal.insert(this.group).then((data) => {
      console.log(data);
      alert("Group added successfully")
      this.router.navigate(['/showGroups'])
    }).catch(e => {
      console.error("Error" + e.message)
    })
  }

  addZoneToEvent(eventZone:Zone) {
    this.group.eventZone = eventZone

  }

  removeZoneClick() {
    this.group.eventZone = new Zone("",0,0);
  }

  protected readonly isEmpty = isEmpty;
}
