import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadComponent } from './thread/thread.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [

  {
    path: 'board/:board',
    children: [
      {
        path: '',
        component: CatalogComponent
      },
      {
        path: 'thread/:number',
        component: ThreadComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
