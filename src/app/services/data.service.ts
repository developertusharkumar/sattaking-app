import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Database;

  constructor(private db: AngularFireDatabase) {
    this.dbRef = this.db.database;
  }

   createGame(payload,gametype) {
    // set the game inside the games
    return this.dbRef.ref(`${this.dbPath}/games/${gametype}/${payload.name}`).set(payload, (error) => {
      if (error) {
        // The write failed...
        console.log('error while adding the data', error);
        return false;
      } else {
        // Data saved successfully!
        return true;
      }
    });
  }
  //  updateGame(payload,gametype) {
  //   // set the game inside the games
  //   return this.dbRef.ref(`${this.dbPath}/games/${gametype}/${payload.name}`).set(payload, (error) => {
  //     if (error) {
  //       // The write failed...
  //       console.log('error while adding the data', error);
  //       return false;
  //     } else {
  //       // Data saved successfully!
  //       return true;
  //     }
  //   });
  // }

  updateGame(payload,gametype) {
    // A post entry.
    var postData = payload;
    
    console.log('data to post', postData);
    // Get a key for a new Post.
    // var newPostKey = this.dbRef.ref(`${this.dbPath}/games/${gametype}`).child(`${payload.name}`).push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[`${this.dbPath}/games/${gametype}/${payload.name}`] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return this.dbRef.ref().update(updates);
  }


  getAllGames(gametype) {
    return this.dbRef.ref(`${this.dbPath}/games/${gametype}`);
  }
}
