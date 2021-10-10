import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentGamePage } from './current-game.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentGamePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentPageRoutingModule {}
