import {Component, inject} from '@angular/core';
import {CameraComponent} from "../camera/camera.component";
import {Drone} from "../../models/drone.model";
import {DroneDalService} from "../../services/drone-dal.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-drones',
  standalone: true,
  imports: [
    CameraComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-drones.component.html',
  styleUrl: './add-drones.component.css'
})
export class AddDronesComponent {
  drone:Drone = new Drone("Dji", "Mini 2 SE", "El Drono", "white", 249, false, false, null);
  dal = inject(DroneDalService);
  builder = inject(FormBuilder)
  defaultColorValue = "white"
  MIN_WEIGHT = 100;
  MAX_WEIGHT = 50000;

  // Error checking the form
  addDroneForm = this.builder.group({
    droneBrand: ["", [Validators.required]],
    droneModel: ["", [Validators.required]],
    droneName: ["", [Validators.required]],
    droneWeight: ["", [Validators.required, Validators.min(this.MIN_WEIGHT), Validators.max(this.MAX_WEIGHT)]],
  });






  onAddClick() {
    this.dal.insert(this.drone).then((data) => {
      console.log(data);
      alert("Record added successfully")
    }).catch((e) => {
      console.log("Errors: " + e.message);
    });
  }
}
