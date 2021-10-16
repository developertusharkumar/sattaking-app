import { Component } from '@angular/core';
import * as moment from 'moment'; 
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'current-game.page.html',
  styleUrls: ['current-game.page.scss']
})
export class CurrentGamePage {

  gameType = 'multiple';

  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Reference;



  constructor(
    private dataService: DataService
  ) {

    console.log('date',moment().date())
    console.log('year',moment().year())
    console.log('month',moment().format('MMM'))
 
  }


  listOfGames() {
    // this.dataService.getAllGames(this.gameType).on('value', (snapshot) => {
      

    // })
  }

  getCurrentGame() {

    // getting the current game
  }



  addCurrentGame() {


  }


  

  

  



  

}
