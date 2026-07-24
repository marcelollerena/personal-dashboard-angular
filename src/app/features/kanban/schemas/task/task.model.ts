export const TASK_CATEGORY_COLORS = [
  { value: 'olive', cssVariable: 'var(--cat-olive)' },
  { value: 'teal', cssVariable: 'var(--cat-teal)' },
  { value: 'pink', cssVariable: 'var(--cat-pink)' },
  { value: 'blue', cssVariable: 'var(--cat-blue)' },
  { value: 'amber', cssVariable: 'var(--cat-amber)' },
  { value: 'red', cssVariable: 'var(--cat-red)' },
  { value: 'violet', cssVariable: 'var(--cat-violet)' },
  { value: 'stone', cssVariable: 'var(--cat-stone)' },
] as const;

export type TaskCategoryColor = (typeof TASK_CATEGORY_COLORS)[number]['value'];

export const TASK_CATEGORY_COLOR_BY_VALUE: Record<TaskCategoryColor, string> =
  TASK_CATEGORY_COLORS.reduce(
    (colors, color) => ({
      ...colors,
      [color.value]: color.cssVariable,
    }),
    {} as Record<TaskCategoryColor, string>,
  );

export const TASK_CATEGORIES = [
  { value: 'work', label: 'Work', color: 'olive' },
  { value: 'personal', label: 'Personal', color: 'teal' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
  { value: 'ideas', label: 'Ideas', color: 'blue' },
] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number]['value'];

export const TASK_STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'inProgress', label: 'In progress' },
  { value: 'done', label: 'Done' },
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number]['value'];

export interface CreateTaskInput {
  title: string;
  description: string | null;
  startDate: string | null;
  dueDate: string | null;
  category: TaskCategory;
  status: TaskStatus;
}

export interface Task extends CreateTaskInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
