import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../types/document';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  host = environment.backend + '/sendEmail';

  constructor(private httpSvc: HttpClient) { }

  public sendNewRequest(doc: Doc) {
    this.httpSvc.post(this.host + '/newRequest', doc).subscribe(response => console.log(response));
  }
}
