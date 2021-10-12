import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modal/modal.service';
import { DataService } from '../../services/data.service';
import { AddGamePage } from './add-game/add-game.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'games.page.html',
  styleUrls: ['games.page.scss'],
})
export class GamesPage implements OnInit {
  gameType = 'multiple';
  allGames: any[];

  constructor(
    private modalService: ModalService,
    private dataService: DataService
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
      const games = [];
      console.log('snapshot ', snapshot.val());
      // as the data is inside the format of object convert that into array to iterate
      const data = snapshot.val();

      // keys
      const gameKeys = Object.keys(data);
      gameKeys.forEach((game) => {
        games.push(data[game]);
      });

      // all the games will be converted to the array
      this.allGames = games;
      console.log('games in the games array', games);

      console.log('data of the all games', data);
    });
  }
}
