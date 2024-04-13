import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ZoneDalService} from "../../services/zone-dal.service";
import {DroneDalService} from "../../services/drone-dal.service";
import {GroupDalService} from "../../services/group-dal.service";
import {Group} from "../../models/group.model";
import { Zone } from '../../models/zone.model';
import { Drone } from '../../models/drone.model';
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.css'
})
export class EditGroupComponent {

  ID:number = 0;
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

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.groupDal.select(Number(this.ID)).then(data => {
        if (data){
          this.group = (data);
        } else {
          console.error('Group not found');
        }
      }).catch(e => {
        console.error(e.message)
      })
    });
    this.showAll()
  }

  checkForZones(size:number){
    console.log(this.zoneList.some(zone => size < zone.maxDrones),size,this.zoneList)

    return this.zoneList.some(zone => size <= zone.maxDrones)
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

  updateEventClick() {
    this.groupDal.update(this.group).then((data) => {
      console.log(data);
      alert("Group updated successfully")
      this.router.navigate(['/showGroups'])
    }).catch(e => {
      console.error("Error" + e.message)
    })
  }

  deleteEventClick() {
    if(confirm("Are you sure to delete "+ this.group.name)) {
      this.groupDal.delete(this.group).then((data) => {
        console.log(data);
        alert("Group deleted successfully")
        this.router.navigate(['/showGroups'])
      }).catch(e => {
        console.error("Error" + e.message)
      })
    }
  }

  addZoneToEvent(eventZone:Zone) {
    this.group.eventZone = eventZone
  }

  removeZoneClick() {
    this.group.eventZone = new Zone("",0,0);
  }

  protected readonly isEmpty = isEmpty;
}
