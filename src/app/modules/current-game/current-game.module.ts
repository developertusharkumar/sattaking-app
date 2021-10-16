import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentGamePage } from './current-game.page';
import { CurrentPageRoutingModule } from './current-game-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, CurrentPageRoutingModule, ReactiveFormsModule],
  declarations: [CurrentGamePage],
})
export class Tab1PageModule {}
