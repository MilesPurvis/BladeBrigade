import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-groups',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './add-groups.component.html',
  styleUrl: './add-groups.component.css'
})
export class AddGroupsComponent {

}
