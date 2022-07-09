import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {Title} from '@angular/platform-browser';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(titleService: Title, router: Router) {
     const navEndEvents = router.events.pipe(
          filter(event => event instanceof NavigationEnd),
      );

     navEndEvents.subscribe((event: NavigationEnd) => {
         titleService.setTitle(this.getTitle(router.routerState, router.routerState.root).join('-'));
         gtag('config', 'G-GHEE5RV5RQ' , {
             'page_path': event.urlAfterRedirects
         });
     });
    }

    // collect that title data properties from all child routes
    // there might be a better way but this worked for me
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
}
