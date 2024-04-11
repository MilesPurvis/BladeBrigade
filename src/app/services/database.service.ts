import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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
        const eventStore = this.db.createObjectStore("event", {
          keyPath: "id",
          autoIncrement: true,
        });
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
