import { Injectable } from '@angular/core';
import {Doc} from '../types/document';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  host = environment.backend + '/requests';


  constructor(private httpSvc: HttpClient) { }

  public saveToStorage(doc: Doc) {
    this.httpSvc.post(this.host + '/new', doc).subscribe(response => console.log(response));
  }

  public getAllRequests() {
    return this.httpSvc.get(this.host + '');
  }

}
