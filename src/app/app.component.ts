import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./components/nav/nav.component";
import {FooterComponent} from "./footer/footer.component";
import {CameraComponent} from "./components/camera/camera.component";
import {DatabaseService} from "./services/database.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, CameraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
database = inject(DatabaseService)

  constructor() {
  this.database.initDatabase()
  }
}
