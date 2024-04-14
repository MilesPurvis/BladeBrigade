/*
Project: Blade Brigade - Final Project
    Miles Purvis & Stefan Kobetich

    Revision History:
      Created 2024-03-31
*/
import {Drone} from "./drone.model";
import {Zone} from "./zone.model";

export class Group {
  id: number | undefined;

  //Organizer info
  name: string = "";
  email: string = "";

  //Event Info
  description: string = "";
  size: number = 0;
  date: Date = new Date()

  //Drones/Zones
  droneArray: Drone[] = [];
  eventZone: Zone = new Zone("", 0, 0);

  constructor(name: string, email: string, description: string, size: number, date: Date, droneArray: Drone[], eventZone: Zone) {
    this.name = name;
    this.email = email;
    this.description = description;
    this.size = size;
    this.date = date;
    this.droneArray = droneArray;
    this.eventZone = eventZone;
  }
}
