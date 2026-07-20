import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NgpButton } from 'ng-primitives/button';
import { heroSun, heroMoon, heroSquares2x2, heroHome } from '@ng-icons/heroicons/outline';

import { appRoutes } from './constants/routes.constants';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'sidebar-component',
  styleUrl: 'sidebar.component.css',
  templateUrl: 'sidebar.component.html',
  providers: [provideIcons({ heroSun, heroMoon, heroHome, heroSquares2x2 })],
  imports: [NgIcon, NgpButton, RouterLink, RouterLinkActive],
})
export class SidebarComponent {
  readonly routes = appRoutes;
  readonly themeService = inject(ThemeService);
}
