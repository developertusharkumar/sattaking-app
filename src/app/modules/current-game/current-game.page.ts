import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HelperService } from 'src/app/services/helper.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'current-game.page.html',
  styleUrls: ['current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {
  gameType = 'multiple';

  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Reference;
  allGames: any[];
  gameForm: FormGroup;

  currentGames: any;

  dateObject: { date: number; month: string; year: number };
  timeSlots: any[];
  showSlots: boolean = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {
    console.log('date', moment().date());
    console.log('year', moment().year());
    console.log('month', moment().format('MMM'));

    this.dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };
  }

  createForm() {
    if (this.gameType === 'multiple') {
      this.gameForm = this.fb.group({
        name: [null, Validators.required],
        result: [null, Number],
      });
    }
    if (this.gameType === 'single') {
      this.gameForm = this.fb.group({
        name: [null, Validators.required],
        time: [null, Validators.required],
        result: [null, Number],
      });
    }
  }

  ngOnInit() {
    this.getAllGames();
    this.getCurrentGame();
  }

  performActions() {
    const dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };

    const previousDate = moment().subtract(1, 'day').date();

    const allFreshGames = [];

    // add one day to the multiple game table
    this.dataService
      .getAllGames('multiple')
      .once('value')
      .then((snapshot) => {
        console.log('result', snapshot.val());

        const games = snapshot.val();

        const gameKeys = Object.keys(games);
        this.createFreshMultipleGames(gameKeys.slice(), games);
        this.createFreshMultipleGamesTable(gameKeys.slice(), games,dateObject);
      });

    this.dataService
      .getAllGames('single')
      .once('value')
      .then((snapshot) => {
        console.log('result', snapshot.val());

        const games = snapshot.val();

        const gameKeys = Object.keys(games);
        this.createFreshSingleGames(gameKeys.slice(), games);
        
        this.createFreshSingleGamesTable(gameKeys.slice(), games,dateObject);
      });

    // delete the current multiple game
    this.deleteCurrentMultipleGame();

    // get the previous day table
    console.log('previous date', moment().subtract(1, 'day').date());
  }

  deleteCurrentMultipleGame() {
      this.dataService.deleteCurrentMultipleGame().then((response) => {
        console.log('multiple game removed')
      })
  }
  createFreshMultipleGames(gameKeys, games) {
    gameKeys.forEach((game) => {
      const result = games[game].result;
      delete games[game].prevResult;
      delete games[game].result;
      games[game]['prevResult'] = result;
    });

    console.log('fresh games for games', games);

    // add fresh games to the current date
    this.dataService.addGamesToGames(games, 'multiple').then((result) => {
      console.log(
        'successfully added the new games payload  to the multiple games',
        result
      );
    });
  }

  createFreshSingleGames(gameKeys, games) {
    gameKeys.forEach((game) => {
      delete games[game].result;
    });

    console.log('fresh games for games', games);

    // add fresh games to the current date
    this.dataService.addGamesToGames(games, 'single').then((result) => {
      console.log(
        'successfully added the new games payload  to the single games',
        result
      );
    });
    this.dataService.createCurrentGame(games, 'single').then((result) => {
      console.log(
        'successfully reset the single games',
        result
      );
    });
  }

  createFreshMultipleGamesTable(gameKeys, games, dateObject) {
    gameKeys.forEach((game) => {
      delete games[game].prevResult;
      delete games[game].result;
    });

    console.log('fresh games', games);

    // add fresh games to the current date
    this.dataService
      .addOneDayExtraToMultipleDataTable(games, 'multiple', dateObject)
      .then((result) => {
        console.log(
          'successfully added the new table to the multiple table',
          result
        );
      });
  }
  createFreshSingleGamesTable(gameKeys, games, dateObject) {
    gameKeys.forEach((game) => {
      delete games[game].result;
    });

    console.log('fresh games for single', games);

    // add fresh games to the current date
    this.dataService
      .addOneDayExtraToMultipleDataTable(games, 'single', dateObject)
      .then((result) => {
        console.log(
          'successfully added the new table to the single table',
          result
        );
      });
  }

  getCurrentGame() {
    // getting the current game

    this.dataService.getCurrentGame(this.gameType).on('value', (snapshot) => {
      console.log('snap shot for current game', snapshot.val());

      if (snapshot.val()) {
        if (this.gameType === 'multiple') {
          this.currentGames = snapshot.val();
        }
        if (this.gameType === 'single') {
          const singleGames = snapshot.val();
          this.currentGames = Object.keys(singleGames).map((key) => {
            return singleGames[key];
          });
        }
      }
    });
  }

  getAllGames() {
    this.createForm();
    this.dataService.getAllGames(this.gameType).on('value', (snapshot) => {
      this.allGames = this.dataService.extractGamesFromAllGames(snapshot);
    });

    console.log('get all games', this.allGames);
  }

  segmentChanged(event) {
    console.log('event', event);
    this.gameType = event.detail.value;
    this.getAllGames();
    this.getCurrentGame();
  }

  showSlotsOfTime(game) {
    const formValues = this.gameForm.value;

    console.log('form values', formValues);
    this.timeSlots = this.dataService.generateTimeWithIntervals(
      formValues.name.slot
    );

    if (this.timeSlots.length > 0) {
      this.showSlots = true;
    }
    console.log('time slots', this.timeSlots);
  }

  addCurrentGame() {
    const formValues = this.gameForm.value;

    formValues.name['result'] = formValues.result;

    const payload = formValues.name;

    console.log('payload', payload);

    this.gameForm.reset();

    // create the current game and update data in all
    const result = this.dataService.createCurrentGame(payload, this.gameType);
    console.log('result', result);
    if (result) {
      this.helperService.presentToast('Current Game Successfully Added', 2000);
      this.updateDataTableAndGamesData({
        result: formValues.result,
        name: formValues.name['name'],
      });
      this.getCurrentGame();
    }
  }

  addCurrentSingleGame() {
    const formValues = this.gameForm.value;

    formValues.name['result'] = formValues.result;

    const payload = formValues.name;
    payload['time'] = formValues.time;

    console.log('payload', payload);

    this.gameForm.reset();

    // create the current game and update data in all
    const result = this.dataService.createCurrentSingleGame(
      payload,
      this.gameType
    );
    console.log('result', result);
    if (result) {
      this.helperService.presentToast('Current Game Successfully Added', 2000);
      this.updateSingleGameDataAndDataTable(payload);
      this.getCurrentGame();
    }
  }

  updateSingleGameDataAndDataTable(payload) {
    console.log('payload for current data upload', payload);
    this.dataService
      .updateSingleDataTableAndGame(payload, this.gameType, this.dateObject)
      .then((response) => {
        console.log(
          'reponse while updating the games and data table',
          response
        );
      })
      .catch((error) => {
        console.log('error while updating the games and data table', error);
      });
  }

  updateDataTableAndGamesData(payload) {
    this.dataService
      .updateDataTableAndGamesData(payload, this.gameType, this.dateObject)
      .then((response) => {
        console.log(
          'reponse while updating the games and data table',
          response
        );
      })
      .catch((error) => {
        console.log('error while updating the games and data table', error);
      });
  }
}
