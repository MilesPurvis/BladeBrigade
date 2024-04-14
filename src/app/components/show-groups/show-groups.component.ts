import {Component} from '@angular/core';
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
  groups: Group[] = [];


  constructor(private dal: GroupDalService) {


  }

  ngOnInit() {
    this.showAllGroups();
  }

  showAllGroups() {
    this.dal.selectAll().then((data) => {
      console.log(data);
      this.groups = data;
    }).catch((e) => {
      console.log("Errors: " + e.message);
    });
  }

  formatDate(inputDate: string): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];

    return `${month} ${parseInt(day)}, ${year}`;
  }

  formatAddress(address: string): string {
    if (address.includes(",")){
      let splitAddress =  address.split(",")
      return `${splitAddress[0]}, ${splitAddress[1]}`
    }
    else{
      return address;
    }
  }

}
