import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ModalService } from 'src/app/modal/modal.service';
import { DataService } from '../../../services/data.service';
import { NavParams } from '@ionic/angular';
import { HelperService } from '../../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {
  gameForm: FormGroup;
  gameType: any;
  operationType: any;
  game: any;
  dateObject: { date: number; month: string; year: number };
  timeSlots: any[];
  showSlots: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private helperService: HelperService,
    private modalService: ModalService,
    private navParams: NavParams,
    private router: Router
  ) {
    this.dateObject = {
      date: moment().date(),
      month: moment().format('MMM'),
      year: moment().year(),
    };
  }

  ngOnInit() {
    // getting the value of the component props
    this.gameType = this.navParams.get('gameType');
    this.game = this.navParams.get('game');
    this.operationType = this.navParams.get('type');
    this.switchForm();
    console.log('game type', this.gameType);
  }

  switchForm() {
    console.log('game type', this.gameType);
    console.log('operation type ', this.operationType);
    console.log('game ', this.game);

    if (this.gameType === 'multiple') {
      if (this.operationType === 'add') {
        this.gameForm = this.fb.group({
          name: [null, Validators.required],
          time: [null, Validators.required],
          result: [null, Number],
        });
      }
      if (this.operationType === 'edit') {
        this.gameForm = this.fb.group({
          name: [this.game.name, Validators.required],
          time: [this.game.time, Validators.required],
          result: [this.game.result, Number],
        });
      }
    }

    if (this.gameType === 'single') {
      if (this.operationType === 'add') {
        this.gameForm = this.fb.group({
          name: [null, Validators.required],
          slot: [null, Validators.required],
          time: [null, Validators.required],
          result: [null, Validators.required]
        });
      }
      if (this.operationType === 'edit') {
        this.gameForm = this.fb.group({
          name: [this.game.name, Validators.required],
          time: [this.game.time, Validators.required],
          result: [this.game.result, Number],
        });
      }
    }
  }



  saveGameDetails() {
    if (this.operationType === 'add') {
      this.addGame();
    }

    if (this.operationType === 'edit') {
      this.editGame();
    }
  }
  

  editGame() {
    const formValues = this.gameForm.value;
    const payload = {
      name: this.game.name,
      time: this.game.time,
      result: formValues.result,
      trackId: this.game.trackId,
      start_date: this.game.start_date,
    };

    const resultToUpdate = formValues.result;

    this.dataService
      .updateGame(payload, resultToUpdate, this.gameType)
      .then((response) => {
        console.log('response of update result', response);
        this.helperService.presentToast('Game Updated Successfully', 2000);
        this.updateDataTable(payload);
        this.dismiss();
      })
      .catch((error) => {
        console.log('response of error result', error);
      });
  }

  addGame() {
    const formValues = this.gameForm.value;

    const payload = {
      name: formValues.name,
      time: moment(formValues.time).format('hh:mm a'),
      trackId: formValues.time,
      result: formValues.result,
      start_date: moment().format('DD-MM-YYYY'),
    };

    console.log('payload for adding the game', payload);

    const result = this.dataService.createGame(payload, this.gameType);
    console.log('result', result);
    if (result) {
      this.helperService.presentToast('Game Successfully Added', 2000);
      this.createDataTable(payload);
      this.dismiss();
    }
  }

  changed(event) {
    console.log('event', event);
  }


  createDataTable(payload) {
    console.log('date Object', this.dateObject);
    console.log('payload Object', payload);

    const success = this.dataService.createDataTable(
      payload,
      this.gameType,
      this.dateObject
    );
    if (success) {
      console.log('data table success fully created');
    } else {
      console.log('something went wrong while creating the data table');
    }
  }

  updateDataTable(payload) {
    console.log('game type for updating the data', this.gameType);
    console.log('date Object', this.dateObject);
    console.log('payload Object', payload);

    this.dataService
      .updateDataTable(payload, this.gameType, this.dateObject)
      .then(
        (response) => {
          console.log('response while updating the data table', response);
        },
        (error) => {
          console.log('error while updating the data table', error);
        }
      );
  }


  // for single game

  showSlotsOfTime() {
    const formValues = this.gameForm.value;
    console.log('get the slot preffered', formValues);
    

    this.timeSlots = this.dataService.generateTimeWithIntervals(formValues.slot);
    console.log('time slots', this.timeSlots);
    if(this.timeSlots.length > 0) {
      this.showSlots = true;
    }

  }


  addSingleGame() {
    const formValues = this.gameForm.value;
    console.log('add single game payload', formValues )
    

    const payload = formValues;
    payload['start_date'] = moment().format('DD-MM-YYYY')

    console.log('payload for adding the game', payload);

    const result = this.dataService.createGame(payload, this.gameType);
    console.log('result', result);
    if (result) {
      this.helperService.presentToast('Game Successfully Added', 2000);
      // this.createDataTable(payload);
      this.dismiss();
    }
  }




  dismiss() {
    this.modalService.dismiss(this.gameType);
  }
}
