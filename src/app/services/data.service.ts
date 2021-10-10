import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = 'sattaking';

  dbRef: firebase.default.database.Reference;
  

  constructor(private db: AngularFireDatabase) { 
    
    this.dbRef = this.db.database.ref(this.dbPath);
    
  }

  

  

}
