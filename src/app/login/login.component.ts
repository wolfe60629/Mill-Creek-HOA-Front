import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from '../services/login.service';
import {MessageService} from 'primeng/api';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String = '';
  password: String = '';

  constructor(private loginService: LoginService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.getAuthorizationHeaderValue().length > 0) {
      this.router.navigate(['/']);
    }
  }

  login () {
    // Retrieve the Auth Token
    this.loginService.getAuthToken(this.username, this.password).add( () => {
      // Check to see if token loaded
      if (this.loginService.getAuthorizationHeaderValue()) {
        this.router.navigate(['/admin']);
      } else {
        this.messageService.add({severity: 'warn', summary: 'Incorrect Username/Password'});
      }

      // Clear The Form
      this.password = '';
      this.username = '';
    });








  }

}
