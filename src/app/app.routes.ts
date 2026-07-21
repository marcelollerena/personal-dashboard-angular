import { Routes } from '@angular/router';

import { HomeComponent } from '@features/home/home.component';
import { KanbanComponent } from '@features/kanban/kanban.component';
import { BoardComponent } from '@features/kanban/components/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'kanban',
    component: KanbanComponent,
    children: [
      {
        path: '',
        component: BoardComponent,
      },
    ],
  },
];
