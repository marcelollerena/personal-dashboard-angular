import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CreateTaskComponent } from './components/dialogs/create-task/create-task.component';

@Component({
  selector: 'kanban-component',
  styleUrl: 'kanban.component.css',
  templateUrl: 'kanban.component.html',
  imports: [RouterOutlet, CreateTaskComponent],
})
export class KanbanComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
