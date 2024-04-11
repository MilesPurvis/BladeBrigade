import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor() { }
  // database = inject(DatabaseService);
  // insert(book: Book): Promise<any>{
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.database.db.transaction(["books"], "readwrite");
  //
  //     transaction.oncomplete = (event: any) => {
  //       console.log("Success: insert transaction successful");
  //     };
  //     transaction.onerror = (event: any) => {
  //       console.log("Error: error in insert transaction: " + event);
  //     };
  //
  //     const bookStore = transaction.objectStore("books");
  //     const req = bookStore.add(book);
  //
  //     req.onsuccess = (event:any) => {
  //       //returns the key of newly added item
  //       console.log(`Success: book added successfully ${event.target.result}`);
  //       resolve(event.target.result);
  //     };
  //
  //     req.onerror = (event: any) => {
  //       console.log("Error: error in add: " + event);
  //       reject(event);
  //     };
  //   });
  // }
  // selectAll(): Promise<Book[]> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.database.db.transaction(["books"]); //readonly
  //
  //     transaction.oncomplete = (event: any) => {
  //       console.log("Success: selectAll transaction successful");
  //     };
  //     transaction.onerror = (event: any) => {
  //       console.log("Error: error in selectAll transaction: " + event);
  //     };
  //
  //     const friendsStore = transaction.objectStore("books");
  //
  //     //Preferred way..
  //     //             const friendCursor = friendsStore.openCursor();
  //     //
  //     //             let books: Book[] = [];
  //     //             friendCursor.onsuccess = (event: any) => {
  //     //                 const cursor = event.target.result;
  //     //                 // console.log(cursor);
  //     //                 if (cursor) {
  //     //                     // console.log(`Name ${cursor.key} is ${cursor.value.name}`);
  //     //                     books.push(cursor.value);
  //     //                     cursor.continue();
  //     //                 } else {
  //     //                     // console.log("No more entries!");
  //     //                     resolve(books);
  //     //                 }
  //     //             };
  //
  //     //also works.. (easy way)
  //
  //     const req = friendsStore.getAll();
  //     req.onsuccess = (event: any) => {
  //       resolve(event.target.result);
  //     };
  //     req.onerror = (event: any) => {
  //       console.log("Error: error in select: " + event);
  //       reject(event);
  //     };
  //
  //
  //   });
  // }
  // select(id: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.database.db.transaction(["books"]); //readonly
  //     transaction.oncomplete = (event: any) => {
  //       console.log("Success: select transaction successful");
  //     };
  //     transaction.onerror = (event: any) => {
  //       console.log("Error: error in select transaction: " + event);
  //     };
  //
  //     const friendsStore = transaction.objectStore("books");
  //
  //     const req = friendsStore.get(id);
  //     req.onsuccess = (event: any) => {
  //       event.target.result ? resolve(event.target.result) : resolve(null);
  //     };
  //     req.onerror = (event: any) => {
  //       console.log("Error: error in select: " + event);
  //       reject(event);
  //     };
  //   });
  // }
  // delete(book: Book): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.database.db.transaction(["books"], "readwrite");
  //
  //     transaction.oncomplete = (event: any) => {
  //       console.log("Success: delete transaction successful");
  //     };
  //     transaction.onerror = (event: any) => {
  //       console.log("Error: error in delete transaction: " + event);
  //     };
  //
  //     const bookStore = transaction.objectStore("books");
  //     if (book.id) {
  //       const reqDelete = bookStore.delete(book.id);
  //       reqDelete.onsuccess = (event: any) => {
  //         console.log(`Success: data deleted successfully: ${event}`);
  //         resolve(event);
  //       };
  //       reqDelete.onerror = (event: any) => {
  //         console.log(`Error: failed to delete: ${event}`);
  //         reject(event);
  //       };
  //     }
  //     else{
  //       reject("book does not have id")
  //     }
  //   });
  // }
  // update(book: Book): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.database.db.transaction(["books"], "readwrite");
  //
  //     transaction.oncomplete = (event: any) => {
  //       console.log("Success: update transaction successful");
  //     };
  //     transaction.onerror = (event: any) => {
  //       console.log("Error: error in update transaction: " + event);
  //     };
  //
  //     const bookStore = transaction.objectStore("books");
  //
  //     const reqUpdate = bookStore.put(book);
  //
  //     reqUpdate.onsuccess = (event: any) => {
  //       console.log(`Success: data updated successfully: ${event}`);
  //       resolve(event);
  //     };
  //
  //     reqUpdate.onerror = (event: any) => {
  //       console.log(`Error: failed to update: ${event}`);
  //       reject(event)
  //     };
  //   });
  // }
}
