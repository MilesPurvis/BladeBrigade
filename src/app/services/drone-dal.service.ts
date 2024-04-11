import {inject, Injectable} from "@angular/core";
import {Drone} from "../models/drone.model";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})

export class DroneDalService{
  database =inject(DatabaseService);

  insert(drone: Drone): Promise<any>{
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const dronesList = transaction.objectStore("drones");
      const req = dronesList.add(drone);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: book added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }
  selectAll(): Promise<Drone[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drones"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const friendsStore = transaction.objectStore("drones");

      const req = friendsStore.getAll();
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
      const transaction = this.database.db.transaction(["drones"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const friendsStore = transaction.objectStore("drones");

      const req = friendsStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(drone: Drone): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const dronesList = transaction.objectStore("drones");

      const reqUpdate = dronesList.put(drone);

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
  delete(drone: Drone): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drones"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const dronesList = transaction.objectStore("drones");
      if (drone.id) {
        const reqDelete = dronesList.delete(drone.id);
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
        reject("book does not have id")
      }
    });
  }
}
