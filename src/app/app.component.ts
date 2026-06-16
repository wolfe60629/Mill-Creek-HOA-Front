import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

declare var gtag;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {
    isScrollSite = true;

    private readonly utilityPaths = ['/login', '/logout'];

    constructor(titleService: Title, router: Router, themeService: ThemeService) {
     themeService.init();
     this.isScrollSite = this.isScrollPath(router.url);

     const navEndEvents = router.events.pipe(
          filter(event => event instanceof NavigationEnd),
      );

     navEndEvents.subscribe((event: NavigationEnd) => {
         titleService.setTitle(this.getTitle(router.routerState, router.routerState.root).join('-'));
         gtag('config', 'G-GHEE5RV5RQ' , {
             'page_path': event.urlAfterRedirects
         });
         this.isScrollSite = this.isScrollPath(event.urlAfterRedirects);
     });
    }

    getTitle(state, parent) {
        const data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(parent.snapshot.data.title);
        }

        if (state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }
        return data;
    }

    private isScrollPath(url: string): boolean {
      const path = url.split('?')[0].split('#')[0] || '/';
      return !this.utilityPaths.some(prefix => path.startsWith(prefix));
    }
}
