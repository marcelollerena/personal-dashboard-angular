import { NgpButton } from 'ng-primitives/button';
import { Component, input, OnInit } from '@angular/core';

@Component({
  imports: [NgpButton],
  selector: 'button-component',
  styleUrl: 'button.component.css',
  templateUrl: 'button.component.html',
})
export class ButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  readonly size = input<ButtonSize>('md');
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly compact = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | null>(null);
}
