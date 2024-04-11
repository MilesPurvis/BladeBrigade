import {Component, inject} from '@angular/core';
import {DroneDalService} from "../../services/drone-dal.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Drone} from "../../models/drone.model";

@Component({
  selector: 'app-edit-drone',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-drone.component.html',
  styleUrl: './edit-drone.component.css'
})
export class EditDroneComponent {
  constructor(private dal: DroneDalService, private route: ActivatedRoute) {  }
  ID = 0;
  drone:Drone = new Drone("", "", "", "White", 0, false, false, null);
  drone1: Drone | null = null;

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.dal.select(this.ID).then((data: Drone | null) => {
        this.drone1 = data; // Assign the retrieved drone to the variable
        if (this.drone1) {
          // Set the form values with the retrieved drone data
          this.modifyDroneForm.patchValue({
            droneBrand: this.drone.droneBrand,
            droneModel: this.drone.droneModel,
            droneName: this.drone.droneName,
            droneColor: this.drone.droneColor,
            droneWeight: this.drone.droneWeight,
            pilotCert: this.drone.pilotCert,
            customModified: this.drone.customModified,
          });
        }
        this.drone1 = this.drone ? this.drone : new Drone("", "", "", "", 0, false, false, null);
      }).catch((error: any) => {
        console.error("Error retrieving drone:", error);
      });
    });
  }

  builder = inject(FormBuilder)
  defaultColorValue = "White"
  MIN_WEIGHT = 100;
  MAX_WEIGHT = 50000;

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


  onModifyClick() {
    // Update drone object with the retrieved value
    this.drone.droneBrand = String(this.modifyDroneForm.get("droneBrand")?.value);
    this.drone.droneModel = String(this.modifyDroneForm.get("droneModel")?.value);
    this.drone.droneName = String(this.modifyDroneForm.get("droneName")?.value);
    this.drone.droneColor = String(this.modifyDroneForm.get("droneColor")?.value);
    this.drone.droneWeight = Number(this.modifyDroneForm.get("droneWeight")?.value);
    this.drone.pilotCert = Boolean(this.modifyDroneForm.get("pilotCert")?.value);
    this.drone.customModified = Boolean(this.modifyDroneForm.get("customModified")?.value);

  }
}
