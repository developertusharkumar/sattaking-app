import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GamesPage } from './games.page';


const routes: Routes = [
  {
    path: '',
    component: GamesPage,
  },
  {
    path: 'add-game',
    loadChildren: () => import('./add-game/add-game.module').then( m => m.AddGamePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
