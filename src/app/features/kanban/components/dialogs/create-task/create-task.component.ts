import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';

import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';

import { NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { NgpInput } from 'ng-primitives/input';
import { NgpTextarea } from 'ng-primitives/textarea';

import { NgpRadioGroup, NgpRadioItem, NgpRadioIndicator } from 'ng-primitives/radio';

import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import {
  CreateTaskInput,
  Task,
  TASK_CATEGORIES,
  TASK_CATEGORY_COLOR_BY_VALUE,
  TASK_STATUSES,
  TaskCategory,
  TaskCategoryColor,
  TaskStatus,
} from '@app/features/kanban/schemas/task/task.model';

import { dateRangeValidator } from '@app/features/kanban/schemas/task/task.validator';
import { TaskService } from '@app/features/kanban/services/task.service';

@Component({
  selector: 'create-task-component',
  styleUrl: 'create-task.component.css',
  templateUrl: 'create-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgIcon,
    NgpLabel,
    NgpInput,
    NgpTextarea,
    NgpRadioItem,
    NgpFormField,
    NgpRadioGroup,
    DialogComponent,
    ButtonComponent,
    NgpRadioIndicator,
  ],
  providers: [provideIcons({ heroPlus })],
})
export class CreateTaskComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly taskService = inject(TaskService);

  readonly submitted = signal(false);
  readonly cancelled = output<void>();
  readonly taskSaved = output<Task>();

  readonly statuses = TASK_STATUSES;
  readonly categories = TASK_CATEGORIES;

  readonly form = this.formBuilder.group(
    {
      title: ['', [Validators.required, Validators.maxLength(100)]],

      description: ['', Validators.maxLength(500)],

      startDate: [''],
      dueDate: [''],

      category: this.formBuilder.control<TaskCategory>('work'),

      status: this.formBuilder.control<TaskStatus>('todo'),
    },
    {
      validators: dateRangeValidator,
    },
  );

  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const task: CreateTaskInput = {
      title: value.title.trim(),
      description: value.description.trim() || null,
      startDate: value.startDate || null,
      dueDate: value.dueDate || null,
      category: value.category,
      status: value.status,
    };

    const savedTask = this.taskService.addTask(task);

    this.taskSaved.emit(savedTask);
    this.form.reset({
      title: '',
      description: '',
      startDate: '',
      dueDate: '',
      category: 'work',
      status: 'todo',
    });
    this.submitted.set(false);

    console.log('Saved task:', savedTask);
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  setCategory(category: TaskCategory | null): void {
    if (category) {
      this.form.controls.category.setValue(category);
    }
  }

  getCategoryColor(color: TaskCategoryColor): string {
    return TASK_CATEGORY_COLOR_BY_VALUE[color];
  }

  setStatus(status: TaskStatus | null): void {
    if (status) {
      this.form.controls.status.setValue(status);
    }
  }
}
