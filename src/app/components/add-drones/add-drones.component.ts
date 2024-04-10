import { Component } from '@angular/core';
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: 'app-add-drones',
  standalone: true,
  imports: [
    CameraComponent
  ],
  templateUrl: './add-drones.component.html',
  styleUrl: './add-drones.component.css'
})
export class AddDronesComponent {

}
