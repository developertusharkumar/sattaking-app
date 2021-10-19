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
    private helperService: HelperService,
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
