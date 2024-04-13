import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent {
  database =inject(DatabaseService);

  CreateDBFunction(){
    this.database.createDatabase().then(data => {
      console.log("Database Created Successfully")
    }).catch(e => {
      console.error(e)
    });
  }

  CreateAllTablesDBFunction(){
    this.CreateDroneTableDBFunction();
    this.CreateZoneTableDBFunction();
    this.CreateGroupTableDBFunction();
  }

  DeleteDBFunction(){
    this.database.deleteDatabase().then(data => {
      console.log("Database deleted Successfully")
    }).catch(e => {
      console.error(e)
    });
  }

  CreateDroneTableDBFunction(){
    this.database.CreateDroneTable();
  }

  CreateZoneTableDBFunction() {
    this.database.CreateZoneTable();
  }

  CreateGroupTableDBFunction(){
    this.database.CreateGroupTable();
  }
}
