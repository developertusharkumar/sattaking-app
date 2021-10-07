import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Reference;

  constructor(private db: AngularFireDatabase) {
 
    this.dbRef = this.db.database.ref(this.dbPath);
    
    this.create();
    
  }

  create(): any {
 
    const customers = this.dbRef.child('customer');
    const primaryKey = 'customer_one';
 
    customers.child(primaryKey).set({
      "firstName": "tushar",
      "lastname": "kumar"
    })
 
    return customers;
 
    
    // // return this.sattaDataRef.push(tutorial);
    // return this.sattaDataRef.set('customer2', {
    //   key: '-MlPSPze52XFB8Pxr2V1'
    // })
  }



  

}
