import {Component, inject} from '@angular/core';
import {Drone} from "../../models/drone.model";
import {DroneDalService} from "../../services/drone-dal.service";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-show-drones',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './show-drones.component.html',
  styleUrl: './show-drones.component.css'
})
export class ShowDronesComponent {
  drones:Drone[] = [];

  constructor(private dal: DroneDalService) {  }

  ngOnInit(){
    this.showAllDrones();
  }

  showAllDrones(){
    this.dal.selectAll().then((data) => {
      console.log(data);
      this.drones = data;
    }).catch((e) => {
      console.log("Errors: " + e.message);
    });
  }

}
