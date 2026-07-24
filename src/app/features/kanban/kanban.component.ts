import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

import { CreateTaskComponent } from './components/dialogs/create-task/create-task.component';
import { TaskService } from './services/task.service';

@Component({
  selector: 'kanban-component',
  styleUrl: 'kanban.component.css',
  templateUrl: 'kanban.component.html',
  imports: [RouterOutlet, CreateTaskComponent],
})
export class KanbanComponent implements OnInit {
  readonly taskService = inject(TaskService);

  constructor() {}

  ngOnInit() {}
}
