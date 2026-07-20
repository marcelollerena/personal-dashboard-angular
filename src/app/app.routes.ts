import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { KanbanComponent } from './features/kanban/kanban.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'kanban',
    component: KanbanComponent,
  },
];
