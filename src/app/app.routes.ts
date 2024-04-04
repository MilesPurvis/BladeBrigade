import { Routes } from '@angular/router';
import {SettingspageComponent} from "./components/settingspage/settingspage.component";
import {DetailpageComponent} from "./components/detailpage/detailpage.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ErrorpageComponent} from "./components/errorpage/errorpage.component";
import {ShowDronesComponent} from "./components/show-drones/show-drones.component";
import {ShowGroupsComponent} from "./components/show-groups/show-groups.component";
import {ShowZonesComponent} from "./components/show-zones/show-zones.component";
import {AddDronesComponent} from "./components/add-drones/add-drones.component";
import {AddGroupsComponent} from "./components/add-groups/add-groups.component";
import {AddZonesComponent} from "./components/add-zones/add-zones.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},

  //show
  {path: "showDrones", component: ShowDronesComponent},
  {path: "showGroups", component: ShowGroupsComponent},
  {path: "showZones", component: ShowZonesComponent},

  //add
  {path: "addDrones", component: AddDronesComponent},
  {path: "addGroups", component: AddGroupsComponent},
  {path: "addZones", component: AddZonesComponent},

  //Edit
  {path: "detail/:id", component: DetailpageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "", redirectTo: "home",pathMatch:"full"},
  {path: "**", component: ErrorpageComponent},
];
