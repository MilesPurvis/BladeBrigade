import {Component, inject} from '@angular/core';
import {CameraComponent} from "../camera/camera.component";
import {Drone} from "../../models/drone.model";
import {DroneDalService} from "../../services/drone-dal.service";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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
  dal = inject(DroneDalService);
  builder = inject(FormBuilder)
  defaultColorValue = "White"
  MIN_WEIGHT = 100;
  MAX_WEIGHT = 50000;

  // Error checking the form
  addDroneForm = this.builder.group({
    droneBrand: ["", [Validators.required]],
    droneModel: ["", [Validators.required]],
    droneName: ["", [Validators.required]],
    droneWeight: ["", [Validators.required, Validators.min(this.MIN_WEIGHT), Validators.max(this.MAX_WEIGHT)]],
    pilotCert: [false],
    customModified: [false],
    droneColor: ["White"]
  });

  drone:Drone = new Drone("", "", "", "White", 0, false, false, null);

  onAddClick() {
    // Update drone object with the retrieved value
    this.drone.droneBrand = String(this.addDroneForm.get("droneBrand")?.value);
    this.drone.droneModel = String(this.addDroneForm.get("droneModel")?.value);
    this.drone.droneName = String(this.addDroneForm.get("droneName")?.value);
    this.drone.droneColor = String(this.addDroneForm.get("droneColor")?.value);
    this.drone.droneWeight = Number(this.addDroneForm.get("droneWeight")?.value);
    this.drone.pilotCert = Boolean(this.addDroneForm.get("pilotCert")?.value);
    this.drone.customModified = Boolean(this.addDroneForm.get("customModified")?.value);

    this.dal.insert(this.drone).then((data) => {
      console.log(data);
      alert("Record added successfully")
    }).catch((e) => {
      console.log("Errors: " + e.message);
    });
  }
}
