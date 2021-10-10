import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentGamePage } from './current-game.page';
import { CurrentPageRoutingModule } from './current-game-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, CurrentPageRoutingModule],
  declarations: [CurrentGamePage],
})
export class Tab1PageModule {}
