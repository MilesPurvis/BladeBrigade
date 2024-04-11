import {Component, inject} from '@angular/core';
import {ZoneDalService} from "../../services/zone-dal.service";
import {Router, RouterLink} from "@angular/router";
import {Zone} from "../../models/zone.model";

@Component({
  selector: 'app-show-zones',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './show-zones.component.html',
  styleUrl: './show-zones.component.css'
})
export class ShowZonesComponent {
  zones: Zone[] = [];
  dal = inject(ZoneDalService)
  router = inject(Router)

  constructor() {
    this.showAll()
  }
  showAll() {
    this.dal.selectAll().then(data => {
      this.zones = data;
      console.log(this.zones)
    }).catch(e => {
      console.error(e)
      this.zones = [];
    })
  }

  protected readonly Zone = Zone;
}
