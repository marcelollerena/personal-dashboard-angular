import { effect, Injectable, signal } from '@angular/core';

import { CreateTaskInput, Task } from '@app/features/kanban/schemas/task/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private static readonly storageKey = 'personal-dashboard-kanban-tasks';

  private readonly tasksState = signal<Task[]>(this.getStoredTasks());

  readonly tasks = this.tasksState.asReadonly();

  constructor() {
    effect(() => {
      this.setStoredTasks(this.tasksState());
    });
  }

  addTask(input: CreateTaskInput): Task {
    const now = new Date().toISOString();

    const task: Task = {
      ...input,
      id: this.createId(),
      createdAt: now,
      updatedAt: now,
    };

    this.tasksState.update((tasks) => [task, ...tasks]);

    return task;
  }

  removeTask(taskId: string): void {
    this.tasksState.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  clearTasks(): void {
    this.tasksState.set([]);
  }

  private getStoredTasks(): Task[] {
    try {
      const storedTasks = localStorage.getItem(TaskService.storageKey);

      if (!storedTasks) {
        return [];
      }

      const parsedTasks = JSON.parse(storedTasks) as unknown;

      return Array.isArray(parsedTasks) ? (parsedTasks as Task[]) : [];
    } catch {
      return [];
    }
  }

  private setStoredTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(TaskService.storageKey, JSON.stringify(tasks));
    } catch {
      return;
    }
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
