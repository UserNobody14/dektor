import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'board/:board',
    children: [
      {
        path: '',
        loadChildren: () => import('./catalog/catalog.module').then(
          m => m.CatalogModule
        )
      },
      {
        path: 'thread/:number',
        loadChildren: () => import('./thread/thread.module').then(
          m => m.ThreadModule
        )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
