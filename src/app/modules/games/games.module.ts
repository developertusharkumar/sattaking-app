import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesPage } from './games.page';

import { GamesRoutingModule } from './games-routing.module';
import { AddGamePageModule } from './add-game/add-game.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    GamesRoutingModule,
    AddGamePageModule,

  ],
  declarations: [GamesPage],
  providers: [LocalNotifications]



})
export class Tab2PageModule {}
