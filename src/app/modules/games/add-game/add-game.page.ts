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

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private helperService: HelperService,
    private modalService: ModalService,
    private navParams: NavParams,
    private router: Router
  ) {}

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
      start_date: this.game.start_date,
    };

    const result = this.dataService
      .updateGame(payload, this.gameType)
      .then((response) => {
        console.log('response of update result', response);
        this.helperService.presentToast('Game Updated Successfully', 2000);
        this.dismiss();
      })
      .catch((error) => {
        console.log('response of error result', error);
      });
    // console.log('result', result);
    // if (result) {
    //   this.helperService.presentToast('Game Updated Successfully', 2000);
    //   this.dismiss();
    // }
  }

  addGame() {
    const formValues = this.gameForm.value;

    const payload = {
      name: formValues.name,
      time: moment(formValues.time).format('hh:mm a'),
      result: formValues.result,
      start_date: moment().format('DD-MM-YYYY'),
    };

    console.log('payload for adding the game', payload);

    const result = this.dataService.createGame(payload, this.gameType);
    console.log('result', result);
    if (result) {
      this.helperService.presentToast('Game Successfully Added', 2000);
      this.dismiss();
    }
  }

  dismiss() {
    this.modalService.dismiss(this.gameType);
  }
}
