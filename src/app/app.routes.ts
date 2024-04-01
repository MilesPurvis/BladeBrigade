import { Routes } from '@angular/router';
import {AddpageComponent} from "./components/addpage/addpage.component";
import {SettingspageComponent} from "./components/settingspage/settingspage.component";
import {DetailpageComponent} from "./components/detailpage/detailpage.component";
import {ShowpageComponent} from "./components/showpage/showpage.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ErrorpageComponent} from "./components/errorpage/errorpage.component";

export const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "show", component: ShowpageComponent},
  {path: "detail/:id", component: DetailpageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "add", component: AddpageComponent},
  {path: "", redirectTo: "home",pathMatch:"full"},
  {path: "**", component: ErrorpageComponent},
];
