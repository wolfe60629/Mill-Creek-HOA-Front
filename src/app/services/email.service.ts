import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../types/document';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  host = environment.backend + '/sendEmail';

  constructor(private httpSvc: HttpClient) { }

  public sendNewRequest(doc: Doc, requestName: String, requestEmail: String): Subscription{
     return this.httpSvc.post(this.host + '/newRequest?name=' + requestName + '&email=' + requestEmail,
        doc).subscribe();
  }
}
