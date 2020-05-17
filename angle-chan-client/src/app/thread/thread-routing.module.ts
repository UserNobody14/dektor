import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ThreadComponent} from './thread/thread.component';



const routes: Routes = [
  {
    path: '',
    component: ThreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }
