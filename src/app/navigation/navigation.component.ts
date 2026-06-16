import { Location } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { filter, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LoginService } from '../services/login.service';
import { SettingsService } from '../services/settings.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { Setting } from '../types/setting';

export interface NavItem {
  label: string;
  homeSection: string;
  external?: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: false,
})
export class NavigationComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isAdmin = false;
  isScrollSite = true;
  navScrolled = false;
  activeHomeSection = 'top';
  showSettingsDialog = false;
  savingSettings = false;
  loadingSettings = false;
  requestEmail: Setting = { settingName: 'requestEmail', value: '' };

  readonly mainLinks: NavItem[] = [
    { label: 'Home', homeSection: 'top', icon: 'home' },
    { label: 'Amenities', homeSection: 'amenities', icon: 'pool' },
    { label: 'Events', homeSection: 'events', icon: 'event' },
    { label: 'Documents', homeSection: 'documents', icon: 'description' },
    { label: 'Contact', homeSection: 'contact', icon: 'mail' },
    { label: 'ARC Portal', homeSection: 'arc', external: 'https://hms-inc.net/', icon: 'architecture' },
  ];

  readonly residentLoginUrl = 'https://hms.cincwebaxis.com/account/loginmodernthemes';

  private readonly utilityPaths = ['/login', '/logout'];
  private readonly scrollSectionIds = ['top', 'amenities', 'events', 'documents', 'contact'];

  private routerSub?: Subscription;
  private sectionObserver?: IntersectionObserver;
  private scrollSpyTimer?: ReturnType<typeof setTimeout>;
  private fragmentDebounce?: ReturnType<typeof setTimeout>;
  private userNavigating = false;

  constructor(
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private settingsService: SettingsService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.updateAdminState();
    this.syncRouteState(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.syncRouteState(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.teardownScrollSpy();
    clearTimeout(this.scrollSpyTimer);
    clearTimeout(this.fragmentDebounce);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.navScrolled = window.scrollY > 12;
  }

  isLinkActive(item: NavItem): boolean {
    if (item.external || !this.isScrollSite) {
      return false;
    }

    return this.activeHomeSection === item.homeSection;
  }

  navigate(item: NavItem, event?: Event): void {
    event?.preventDefault();
    this.closeMenu();

    if (item.external) {
      window.open(item.external, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!this.isScrollSite) {
      this.navigateToHomeSection(item.homeSection);
      return;
    }

    this.userNavigating = true;
    clearTimeout(this.fragmentDebounce);
    this.replaceUrlFragment(item.homeSection);
    this.scrollToSection(item.homeSection);

    setTimeout(() => {
      this.userNavigating = false;
    }, 700);
  }

  goHome(event?: Event): void {
    event?.preventDefault();
    this.closeMenu();

    if (!this.isScrollSite) {
      this.navigateToHomeSection('top');
      return;
    }

    this.userNavigating = true;
    this.replaceUrlFragment('top');
    this.scrollToSection('top');

    setTimeout(() => {
      this.userNavigating = false;
    }, 700);
  }

  logout(): void {
    this.loginService.logout();
    window.location.reload();
  }

  openBoardSignIn(): void {
    this.router.navigate(['/login']);
  }

  openSettings(): void {
    this.showSettingsDialog = true;
    this.loadSettings();
  }

  closeSettings(): void {
    this.showSettingsDialog = false;
  }

  saveSettings(): void {
    const email = this.requestEmail?.value?.trim();
    if (!email) {
      this.messageService.add({ severity: 'warn', summary: 'Enter an email address for document requests.' });
      return;
    }

    this.savingSettings = true;
    this.requestEmail.value = email;
    this.settingsService.saveSetting(this.requestEmail).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Settings saved.' });
        this.savingSettings = false;
        this.showSettingsDialog = false;
      },
      error: err => {
        this.messageService.add({ severity: 'warn', summary: 'Could not save settings', detail: err });
        this.savingSettings = false;
      },
    });
  }

  closeMenuFromLink(): void {
    this.closeMenu();
  }

  private syncRouteState(url: string): void {
    const path = url.split('?')[0].split('#')[0] || '/';
    this.isScrollSite = !this.utilityPaths.some(prefix => path.startsWith(prefix));
    this.updateAdminState();

    const fragment = this.router.parseUrl(url).fragment;
    const sectionFromRoute = this.getSectionFromPath(path);

    if (this.isScrollSite) {
      if (!this.userNavigating) {
        if (fragment && this.scrollSectionIds.includes(fragment)) {
          this.activeHomeSection = fragment;
          this.scheduleScrollToSection(fragment);
        } else if (sectionFromRoute) {
          this.activeHomeSection = sectionFromRoute;
          this.scheduleScrollToSection(sectionFromRoute);
        }
      }

      this.scheduleScrollSpy();
    } else {
      this.activeHomeSection = '';
      this.teardownScrollSpy();
    }
  }

  private getSectionFromPath(path: string): string | undefined {
    const section = path.replace(/^\//, '');
    return this.scrollSectionIds.includes(section) ? section : undefined;
  }

  private scheduleScrollToSection(sectionId: string): void {
    clearTimeout(this.scrollSpyTimer);
    this.scrollSpyTimer = setTimeout(() => this.scrollToSection(sectionId, false), 160);
  }

  private scrollToSection(sectionId: string, smooth = true): void {
    const target = document.getElementById(sectionId);
    if (!target) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
        this.activeHomeSection = 'top';
      }
      return;
    }

    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    this.activeHomeSection = sectionId;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollRevealDirective.refreshAll());
    });
    setTimeout(() => ScrollRevealDirective.refreshAll(), 200);
  }

  private scheduleScrollSpy(): void {
    clearTimeout(this.scrollSpyTimer);
    this.scrollSpyTimer = setTimeout(() => this.setupScrollSpy(), 250);
  }

  private setupScrollSpy(): void {
    this.teardownScrollSpy();

    const elements = this.scrollSectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) {
      return;
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        if (this.userNavigating) {
          return;
        }

        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const sectionId = visible[0]?.target.id;
        if (sectionId && sectionId !== this.activeHomeSection) {
          this.activeHomeSection = sectionId;
          this.updateUrlFragment(sectionId);
        }
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.1, 0.25],
      },
    );

    elements.forEach(element => this.sectionObserver!.observe(element));
  }

  private updateUrlFragment(sectionId: string): void {
    clearTimeout(this.fragmentDebounce);

    this.fragmentDebounce = setTimeout(() => {
      this.replaceUrlFragment(sectionId);
    }, 180);
  }

  private replaceUrlFragment(sectionId: string): void {
    const nextUrl = this.router.serializeUrl(this.router.createUrlTree(['/'], { fragment: sectionId }));
    const currentPath = this.router.url.split('?')[0].split('#')[0] || '/';
    const currentFragment = this.router.parseUrl(this.router.url).fragment;

    if ((currentPath === '/' || currentPath === '') && currentFragment === sectionId) {
      return;
    }

    this.location.replaceState(nextUrl);
  }

  private teardownScrollSpy(): void {
    this.sectionObserver?.disconnect();
    this.sectionObserver = undefined;
  }

  private closeMenu(): void {
    this.sidenav?.close();
  }

  private navigateToHomeSection(sectionId: string): void {
    const path = sectionId === 'top' ? '/' : `/${sectionId}`;
    this.router.navigate([path]);
  }

  private updateAdminState(): void {
    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
  }

  private loadSettings(): void {
    this.loadingSettings = true;
    this.settingsService.getSettingByName('requestEmail').subscribe({
      next: (setting: Setting) => {
        this.requestEmail = setting ?? { settingName: 'requestEmail', value: '' };
      },
      error: () => {
        this.requestEmail = { settingName: 'requestEmail', value: '' };
      },
      complete: () => {
        this.loadingSettings = false;
      },
    });
  }
}
