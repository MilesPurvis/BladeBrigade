import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Zone} from "../models/zone.model";

@Injectable({
  providedIn: 'root'
})
export class ZoneDalService {

  constructor() { }
  database = inject(DatabaseService);

  insert(zone:Zone): Promise<any>{
    return new Promise((resolve, reject) => {
      console.log(this.database.db)
      const transaction = this.database.db.transaction(["zones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const zoneStore = transaction.objectStore("zones");
      const req = zoneStore.add(zone);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: zone added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }
  selectAll(): Promise<Zone[]>{
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["zones"],"readonly"); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const zoneStore = transaction.objectStore("zones");

      //Preferred way
      //             const friendCursor = zoneStore.openCursor();
      //
      //             let zones: Zones[] = [];
      //             friendCursor.onsuccess = (event: any) => {
      //                 const cursor = event.target.result;
      //                 // console.log(cursor);
      //                 if (cursor) {
      //                     // console.log(`Name ${cursor.key} is ${cursor.value.name}`);
      //                     zones.push(cursor.value);
      //                     cursor.continue();
      //                 } else {
      //                     // console.log("No more entries!");
      //                     resolve(zones);
      //                 }
      //             };

      //also works (easy way)
      const req = zoneStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {

        console.log("Error: error in select: " + event);
        reject(event);
      };


    });
  }
  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["zones"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const zoneStore = transaction.objectStore("zones");

      const req = zoneStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }
  delete(zone: Zone): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["zones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const zoneStore = transaction.objectStore("zones");
      if (zone.id) {
        const reqDelete = zoneStore.delete(zone.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      }
      else{
        reject("zone does not have id")
      }
    });
  }
  update(zone: Zone): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["zones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const zoneStore = transaction.objectStore("zones");

      const reqUpdate = zoneStore.put(zone);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }
}
