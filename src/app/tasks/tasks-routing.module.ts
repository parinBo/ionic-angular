import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: 'task-list',
    loadChildren: () => import('./task-list/task-list.module').then( m => m.TaskListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {}
