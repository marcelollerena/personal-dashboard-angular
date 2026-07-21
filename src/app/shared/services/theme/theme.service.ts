import { effect, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

import { StoredTheme, Theme } from '@shared/types/theme/theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly renderer: Renderer2;
  private static readonly storageKey = 'docs-current-theme';

  theme = signal<Theme>(this.getStoredTheme() ?? this.getPreferredTheme());

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    effect(() => {
      const theme = this.theme();

      this.renderer.setStyle(document.documentElement, 'color-scheme', theme);
      if (theme === 'dark') {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
      localStorage.setItem(ThemeService.storageKey, theme);
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  toggleTheme(): void {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  getStoredTheme(): StoredTheme {
    try {
      const storedTheme = localStorage.getItem(ThemeService.storageKey);
      return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
    } catch {
      return null;
    }
  }

  private getPreferredTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
