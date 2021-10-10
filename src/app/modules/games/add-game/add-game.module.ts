import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { AddGamePageRoutingModule } from './add-game-routing.module';

import { AddGamePage } from './add-game.page';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddGamePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddGamePage]
})
export class AddGamePageModule {}
