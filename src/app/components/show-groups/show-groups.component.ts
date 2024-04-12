import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Group} from "../../models/group.model";
import {GroupDalService} from "../../services/group-dal.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-show-groups',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './show-groups.component.html',
  styleUrl: './show-groups.component.css'
})
export class ShowGroupsComponent {
  groups:Group[] = [];

  constructor(private dal: GroupDalService) {  }

   ngOnInit(){
     this.showAllGroups();
   }

   showAllGroups(){
     this.dal.selectAll().then((data) => {
       console.log(data);
       this.groups = data;
     }).catch((e) => {
       console.log("Errors: " + e.message);
     });
   }

}
