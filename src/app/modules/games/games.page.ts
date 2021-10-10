import { Component } from '@angular/core';
import { ModalService } from 'src/app/modal/modal.service';
import { AddGamePage } from './add-game/add-game.page';



@Component({
  selector: 'app-tab2',
  templateUrl: 'games.page.html',
  styleUrls: ['games.page.scss']
})
export class GamesPage {

  gameType = 'multiple'

  constructor(private modalService: ModalService) {}

  segmentChanged(event) {
    console.log('event', event);
     this.gameType = event.detail.value;
  }

  addGame() {
    this.modalService.presentModal(AddGamePage,{},'add-modal');
  }

}
