import { Component, OnInit } from '@angular/core';
import DialogComponent from '@app/shared/components/dialog/dialog.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'create-task-component',
  templateUrl: 'create-task.component.html',
  imports: [DialogComponent, NgIcon],
})
export class CreateTaskComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
