import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Drone} from "../models/drone.model";
import {Group} from "../models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupDalService {

  database =inject(DatabaseService);

  insert(group: Group): Promise<any>{
    return new Promise((resolve, reject) => {
      console.log(this.database.db)
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const groupStore = transaction.objectStore("events");
      const req = groupStore.add(group);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: group added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }
  selectAll(): Promise<Group[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const dronesStore = transaction.objectStore("events");

      const req = dronesStore.getAll();
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
      const transaction = this.database.db.transaction(["events"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const dronesStore = transaction.objectStore("events");

      const req = dronesStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(group: Group): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const groupStore = transaction.objectStore("events");

      const reqUpdate = groupStore.put(group);

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
  delete(group: Group): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["events"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const groupStore = transaction.objectStore("events");
      if (group.id) {
        const reqDelete = groupStore.delete(group.id);
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
        reject("group does not have id")
      }
    });
  }
}
