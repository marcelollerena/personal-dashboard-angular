import { Component, input } from '@angular/core';

import {
  NgpDialog,
  NgpDialogDescription,
  NgpDialogOverlay,
  NgpDialogTitle,
  NgpDialogTrigger,
} from 'ng-primitives/dialog';

import { ButtonComponent } from '../button/button.component';
import { provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'dialog-component',
  styleUrl: 'dialog.component.css',
  templateUrl: 'dialog.component.html',
  imports: [
    NgpDialog,
    NgpDialogOverlay,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
    ButtonComponent,
  ],
  providers: [provideIcons({ heroPlus })],
})
export class DialogComponent {
  readonly buttonTrigger = input('Open Dialog');
  readonly dialogTitle = input('Dialog Title');
}
