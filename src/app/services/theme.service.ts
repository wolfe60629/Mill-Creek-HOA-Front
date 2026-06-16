import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'mc-theme';
  private _theme: ThemeMode = 'light';

  get theme(): ThemeMode {
    return this._theme;
  }

  get isDark(): boolean {
    return this._theme === 'dark';
  }

  init(): void {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') {
      this.applyTheme(saved, false);
      return;
    }

    this.applyTheme('light', false);
  }

  toggle(): void {
    this.applyTheme(this._theme === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode, persist = true): void {
    this._theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem(this.storageKey, theme);
    }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  }
}
