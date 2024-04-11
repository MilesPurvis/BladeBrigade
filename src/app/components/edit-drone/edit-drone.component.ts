import {Component, inject} from '@angular/core';
import {DroneDalService} from "../../services/drone-dal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Drone} from "../../models/drone.model";
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: 'app-edit-drone',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CameraComponent
  ],
  templateUrl: './edit-drone.component.html',
  styleUrl: './edit-drone.component.css'
})
export class EditDroneComponent {
  router = inject(Router)
  ID:number = 0;
  drone:Drone = new Drone("", "", "", "White", 0, false, false, null);
  builder = inject(FormBuilder)
  defaultColorValue = "White"
  MIN_WEIGHT = 100;
  MAX_WEIGHT = 50000;

  constructor(private dal: DroneDalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.dal.select(this.ID).then(data => {
        console.log(data)

        if (data){

          this.setFormValues();
        } else {
          console.error('Drone not found');
        }
      }).catch(e => {
        console.error(e.message)
      })
    });
  }

  // Error checking the form
  modifyDroneForm = this.builder.group({
    droneBrand: ["", [Validators.required]],
    droneModel: ["", [Validators.required]],
    droneName: ["", [Validators.required]],
    droneWeight: [0, [Validators.required, Validators.min(this.MIN_WEIGHT), Validators.max(this.MAX_WEIGHT)]],
    pilotCert: [false],
    customModified: [false],
    droneColor: ["White"]
  });

  setFormValues() {
    this.modifyDroneForm.patchValue({
      droneBrand: this.drone.droneBrand,
      droneModel: this.drone.droneModel,
      droneName: this.drone.droneName,
      droneColor: this.drone.droneColor,
      droneWeight: this.drone.droneWeight,
      pilotCert: this.drone.pilotCert,
      customModified: this.drone.customModified
    });
  }

  onModifyClick() {
    // Update drone object with the retrieved value
    this.drone.droneBrand = String(this.modifyDroneForm.get("droneBrand")?.value);
    this.drone.droneModel = String(this.modifyDroneForm.get("droneModel")?.value);
    this.drone.droneName = String(this.modifyDroneForm.get("droneName")?.value);
    this.drone.droneColor = String(this.modifyDroneForm.get("droneColor")?.value);
    this.drone.droneWeight = Number(this.modifyDroneForm.get("droneWeight")?.value);
    this.drone.pilotCert = Boolean(this.modifyDroneForm.get("pilotCert")?.value);
    this.drone.customModified = Boolean(this.modifyDroneForm.get("customModified")?.value);
    this.updateDrone();
  }

  updateDrone() {
    this.dal.update(this.drone).then((data)=>{
      console.log(data)
      alert("Record Updated Success");
      this.router.navigate(['/showDrones'])
    }).catch(e=>{
      console.error(e.message)})
  }

  onDeleteClick() {
    if(confirm(`Proceed with deleting the ${this.drone.droneBrand} ${this.drone.droneModel}`)) {
      this.dal.delete(this.drone).then(data =>{
        this.router.navigate(['/showDrones'])
      }).catch(e=>{
        console.error(e.message)
      })
    }else{
      alert("Drone deletion failed")
    }

  }
}
