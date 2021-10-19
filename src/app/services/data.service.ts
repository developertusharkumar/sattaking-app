import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Database;

  constructor(private db: AngularFireDatabase) {
    this.dbRef = this.db.database;
  }

  // create

  createGame(payload, gametype) {
    // set the game inside the games
    return this.dbRef
      .ref(`${this.dbPath}/games/${gametype}/${payload.name}`)
      .set(payload, (error) => {
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
  createDataTable(payload, gametype, dateObject) {
    // set the game inside the games
    return this.dbRef
      .ref(
        `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}`
      )
      .set(payload, (error) => {
        if (error) {
          // The write failed...
          console.log('error while adding the data', error);
          return false;
        } else {
          // Data saved successfully
          console.log('data table successfully created');
          return true;
        }
      });
  }

  createCurrentGame(payload, gametype) {
    return this.dbRef
      .ref(`${this.dbPath}/currentGame/${gametype}`)
      .set(payload, (error) => {
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

  createCurrentSingleGame(payload, gametype) {
    return this.dbRef
      .ref(`${this.dbPath}/currentGame/${gametype}/${payload.name}`)
      .set(payload, (error) => {
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

  // read
  getAllGames(gametype) {
    return this.dbRef.ref(`${this.dbPath}/games/${gametype}`);
  }
  getCurrentGame(gametype) {
    return this.dbRef.ref(`${this.dbPath}/currentGame/${gametype}`);
  }

  // update
  updateGame(payload, updateKey, gametype) {
    // A post entry.
    var postData = updateKey;

    console.log('data to post', postData);
    // Get a key for a new Post.
    // var newPostKey = this.dbRef.ref(`${this.dbPath}/games/${gametype}`).child(`${payload.name}`).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/result`] =
      postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return this.dbRef.ref().update(updates);
  }

  updateSingleGame(payload, gametype) {
    // Get a key for a new Post.
    // var newPostKey = this.dbRef.ref(`${this.dbPath}/games/${gametype}`).child(`${payload.name}`).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/result`] =
      payload.result;
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/time`] =
      payload.time;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return this.dbRef.ref().update(updates);
  }

  updateSingleDataTable(payload, gametype, dateObject) {
    console.log('date object', dateObject);

    var updates = {};
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/result`
    ] = payload.result;
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/time`
    ] = payload.time;
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/time_slots/${payload.time}/result`
    ] = payload.result;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return this.dbRef.ref().update(updates);
  }

  updateSingleDataTableAndGame(payload, gametype, dateObject) {
    console.log('date object', dateObject);

    var updates = {};
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/result`
    ] = payload.result;
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/time`
    ] = payload.time;
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/time_slots/${payload.time}/result`
    ] = payload.result;
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/result`] =
      payload.result;
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/time`] =
      payload.time;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return this.dbRef.ref().update(updates);
  }

  updateDataTable(payload, gametype, dateObject) {
    console.log('date object', dateObject);

    var updates = {};
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/result`
    ] = payload.result;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return this.dbRef.ref().update(updates);
  }

  updateDataTableAndGamesData(payload, gametype, dateObject) {
    console.log('date object', dateObject);

    var updates = {};
    updates[
      `${this.dbPath}/tables/${gametype}/${dateObject.month}-${dateObject.year}/${dateObject.date}/${payload.name}/result`
    ] = payload.result;
    updates[`${this.dbPath}/games/${gametype}/${payload.name}/result`] =
      payload.result;

    return this.dbRef.ref().update(updates);
  }

  // delete

  // helper functions

  extractGamesFromAllGames(snapshot) {
    const games = [];
    console.log('snapshot ', snapshot.val());

    // as the data is inside the format of object convert that into array to iterate
    const data = snapshot.val();

    if (data) {
      // keys
      const gameKeys = Object.keys(data);
      gameKeys.forEach((game) => {
        games.push(data[game]);
      });

      console.log('games in the games array', games);

      console.log('data of the all games', data);

      // all the games will be converted to the array
      return games;
    } else {
      return [];
    }
  }

  generateTimeWithIntervals(interval) {
    const ranges = [];
    const date = new Date();
    const format = {
      hour: 'numeric',
      minute: 'numeric',
    };

    for (let minutes = 0; minutes < 21 * 60; minutes = minutes + interval) {
      date.setHours(9);
      date.setMinutes(minutes);
      ranges.push(moment(date).format('h:mm A'));
    }

    console.log('ranges', ranges);
    const getTimeRangeIndex = ranges.findIndex((range) => range === '5:00 PM');
    console.log('index', getTimeRangeIndex);

    console.log('left array', ranges.slice(0, getTimeRangeIndex + 1));

    return ranges.slice(0, getTimeRangeIndex + 1);
  }

  convertArrayToObject(arr) {
    if (arr.length > 0) {
      const obj = {};
      arr.forEach((item) => {
        console.log('item', item);

        obj[item] = { time: item };
      });

      return obj;
      // console.log('object array to object', arrayToObject1);
    } else {
      return [];
    }
  }
}
