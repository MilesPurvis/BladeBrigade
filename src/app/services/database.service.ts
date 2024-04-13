import {Injectable} from '@angular/core';
import {Zone} from "../models/zone.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  CreateDroneTable(){
    const drones = [
      { droneBrand: "The Drone Company", droneModel: "Drono II", droneName: "The flying fortress", droneColor: "Multicolored", droneWeight: 458, pilotCert: true, customModified: true, droneImage: null},
      { droneBrand: "DJI", droneModel: "Mini 2 SE", droneName: "DJ DRONE", droneColor: "White", droneWeight: 249, pilotCert: false, customModified: false, droneImage: null}
    ];

    const transaction = this.db.transaction(['drones'], 'readwrite');
    const droneStore = transaction.objectStore('drones');

    drones.forEach(drone => {
      droneStore.add(drone);
    });
  }
  CreateZoneTable(){
    const zones = [
      { address: "57 Metcalfe St, Toronto, ON M4X 1R9, Canada", radius: 1000, maxDrones: 5},
      { address: "215 Britton Pl, Kitchener, ON N2C 2T3, Canada", radius: 3400, maxDrones: 7}
    ];

    const transaction = this.db.transaction(['zones'], 'readwrite');
    const zoneStore = transaction.objectStore('zones');

    zones.forEach(zone => {
      zoneStore.add(zone);
    });
  }
  CreateGroupTable(){
    const groups = [
      {name: "Fun Flying at the park", email: "droneemail@gmail.com", description: "Fun filled flying mixed with races, competitions, and drone info",
        size: 4, date: "2024-07-25", droneArray: [
          { droneBrand: "The Drone Company", droneModel: "Drono II", droneName: "The flying fortress", droneColor: "Multicolored", droneWeight: 458, pilotCert: true, customModified: true, droneImage: null},
          { droneBrand: "DJI", droneModel: "Mini 2 SE", droneName: "DJ DRONE", droneColor: "White", droneWeight: 249, pilotCert: false, customModified: false, droneImage: null}
        ], eventZone: { address: "57 Metcalfe St, Toronto, ON M4X 1R9, Canada", radius: 1000, maxDrones: 5},
      },
      {name: "Drone Obstacle challenges Event", email: "droneflying2@gmail.com", description: "Are you willing to compete in the ultimate drone championship? If so look no father, we have it right here!",
        size: 4, date: "2025-06-04", droneArray: [
          { droneBrand: "The Drone Company", droneModel: "Drono II", droneName: "The flying fortress", droneColor: "Multicolored", droneWeight: 458, pilotCert: true, customModified: true, droneImage: null},
          { droneBrand: "DJI", droneModel: "Mini 2 SE", droneName: "DJ DRONE", droneColor: "White", droneWeight: 249, pilotCert: false, customModified: false, droneImage: null},
          { droneBrand: "Drones R us", droneModel: "Heavy lifter X5", droneName: "Warplane Drone", droneColor: "Black", droneWeight: 2340, pilotCert: true, customModified: false, droneImage: null}
        ], eventZone: {address: "215 Britton Pl, Kitchener, ON N2C 2T3, Canada", radius: 3400, maxDrones: 7}
      }
    ];

    const transaction = this.db.transaction(['events'], 'readwrite');
    const eventStore = transaction.objectStore('events');

    groups.forEach(group => {
      eventStore.add(group);
    });
  }

  constructor() {
  }

  //create database
  db: any;

  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("BladeBrigadeDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database! - database.service");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called - database.service");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const droneStore = this.db.createObjectStore("drones", {
          keyPath: "id",
          autoIncrement: true,
        });
        const zoneStore = this.db.createObjectStore("zones", {
          keyPath: "id",
          autoIncrement: true,
        });
        const eventStore = this.db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true,
        });
      };
    });
  }

  deleteDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase("BladeBrigadeDB");

      deleteRequest.onsuccess = (event) => {
        this.db = null;
        console.log("Database deleted successfully.");
        resolve();
      };

      deleteRequest.onerror = (event) => {
        console.error("Error deleting database: " + event);
        reject(event);
      };

      deleteRequest.onblocked = (event) => {
        this.db = null;
        console.warn("Database delete request blocked: " + event);
      };
    });
  }

  initDatabase() {
    this.createDatabase().then((data) => {
      console.log("database created 🥳🥳🥳🥳")
    }).catch(e => {
      console.log("database error 😭😭" + e.message)
    })
  }
}
