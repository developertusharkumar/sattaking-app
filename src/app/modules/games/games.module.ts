import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesPage } from './games.page';

import { GamesRoutingModule } from './games-routing.module';
import { AddGamePageModule } from './add-game/add-game.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GamesRoutingModule,
    AddGamePageModule
  ],
  declarations: [GamesPage]
})
export class Tab2PageModule {}
