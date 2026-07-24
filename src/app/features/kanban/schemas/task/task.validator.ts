import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate = control.get('startDate')?.value as string;
  const dueDate = control.get('dueDate')?.value as string;

  if (!startDate || !dueDate) {
    return null;
  }

  return dueDate < startDate ? { invalidDateRange: true } : null;
};
