import { Component } from '@angular/core';
import * as moment from 'moment'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'current-game.page.html',
  styleUrls: ['current-game.page.scss']
})
export class CurrentGamePage {

  private dbPath = 'sattaking';
  dbRef: firebase.default.database.Reference;

  constructor() {

    console.log('date',moment().date())
    console.log('year',moment().year())
    console.log('month',moment().format('MMM'))
 
  }


  

  



  

}
