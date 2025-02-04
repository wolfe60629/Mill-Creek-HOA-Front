import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { LoginService } from '../services/login.service'

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: false
})
export class NavigationComponent {
  home = '/';
  route: string;
  isAdmin = false;

  constructor(private location: Location, private router: Router, private loginService: LoginService) {
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
      } else {
        this.route = this.home;
      }

      this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
    });
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
  }

  openAdmin() {
    this.router.navigate(['/admin']);
  }
}
