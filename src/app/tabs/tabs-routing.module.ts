import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'current-game',
        loadChildren: () => import('../modules/current-game/current-game.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'games',
        loadChildren: () => import('../modules/games/games.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/current-game',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/current-game',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
