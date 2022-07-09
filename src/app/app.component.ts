import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Mill Creek Community Association';
    constructor(router: Router) {
     const navEndEvents = router.events.pipe(
          filter(event => event instanceof NavigationEnd),
      );

     navEndEvents.subscribe((event: NavigationEnd) => {
         gtag('config', 'G-GHEE5RV5RQ' , {
             'page_path': event.urlAfterRedirects
         });
     });
    }
}
