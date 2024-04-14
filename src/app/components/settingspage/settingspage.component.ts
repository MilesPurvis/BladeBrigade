/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
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
  massButton = false;

  CreateDBFunction(){
    this.database.createDatabase().then(data => {
      console.log("Database Created Successfully")
      alert("Created the DB!");
    }).catch(e => {
      console.error(e)
    });
  }

  CreateAllTablesDBFunction(){
    this.massButton = true;
    this.CreateDroneTableDBFunction();
    this.CreateZoneTableDBFunction();
    this.CreateGroupTableDBFunction();
    this.massButton = false;
    alert("Created the DB Tables!");
  }

  DeleteDBFunction(){
    if(confirm("Are you sure to delete the Database?")){
      this.database.deleteDatabase().then(data => {
        console.log("Database deleted Successfully")
        alert("The Database has been deleted!");
      }).catch(e => {
        console.error(e)
      });
    }
  }

  CreateDroneTableDBFunction(){
    this.database.CreateDroneTable();
    if (!this.massButton){
      alert("The Drone table has been created!");
    }
  }

  CreateZoneTableDBFunction() {
    this.database.CreateZoneTable();
    if (!this.massButton) {
      alert("The Zone table has been created!");
    }
  }

  CreateGroupTableDBFunction(){
    this.database.CreateGroupTable();
    if (!this.massButton) {
      alert("The Event table has been created!");
    }
  }
}
