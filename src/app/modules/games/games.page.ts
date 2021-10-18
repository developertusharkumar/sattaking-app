import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal/modal.service';
import { LocalNotificationService } from 'src/app/services/local-notifications.service';
import { DataService } from '../../services/data.service';
import { AddGamePage } from './add-game/add-game.page';

import * as moment from 'moment';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'games.page.html',
  styleUrls: ['games.page.scss'],
})
export class GamesPage implements OnInit {
  gameType = 'multiple';
  allGames: any[];
  loading: Promise<HTMLIonLoadingElement>;

  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private localNotificationService: LocalNotificationService,
    private helperService: HelperService,
  ) {}

  ngOnInit() {
    this.getAllGames();
  }

  segmentChanged(event) {
    console.log('event', event);
    this.gameType = event.detail.value;
    this.getAllGames();
  }

  addGame() {
    this.modalService.presentModal(
      AddGamePage,
      {
        gameType: this.gameType,
        type: 'add',
        game: null,
      },
      'add-modal',
      (modalDismissedResponse) => {
        console.log('modal dismiss response', modalDismissedResponse);
        this.gameType = modalDismissedResponse.data.gameType;
        this.getAllGames();
      }
    );
  }

  editGame(game) {
    this.modalService.presentModal(
      AddGamePage,
      {
        gameType: this.gameType,
        type: 'edit',
        game: game,
      },
      'edit-modal',
      (modalDismissedResponse) => {
        console.log('modal dismiss response', modalDismissedResponse);
        this.gameType = modalDismissedResponse.data.gameType;
        this.getAllGames();
      }
    );
  }

  getAllGames() {
    this.dataService.getAllGames(this.gameType).on('value', (snapshot) => {
      this.allGames = this.dataService.extractGamesFromAllGames(snapshot);
      console.log('all games', this.allGames);
    });
  }

  triggerNotifications() {
    var dt = moment('03:03 AM', ['h:mm A']).format('HH:mm');
    var date = moment().format('YYYY-MM-DD');
    const time = moment(`${date}T${dt}`).utcOffset('+05:30').format();
    console.log('time', time);
    console.log('time', dt);

    // this.localNotificationService.triggerFirstNotification()
    // const date  = moment();
    // const time = "2021-10-16T00:42:46.905+05:30"
    // console.log('time inside the trigger notification', time);
    this.localNotificationService.setLocalNotification(
      'Game Reminder',
      date,
      time,
      { name: 'Gali1', time: '02:00 Am' }
    );
  }
}
