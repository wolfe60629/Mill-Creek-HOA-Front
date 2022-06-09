import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../types/document';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewslettersService {
  host = environment.backend + '/newsletters';


  constructor(private httpSvc: HttpClient) { }


  public saveToStorage(doc: Doc): Observable<Object> {
    return this.httpSvc.post(this.host + '/new', doc);
  }

  public getAllNewsletters() {
    return this.httpSvc.get(this.host + '');
  }
}
