import { Injectable } from '@angular/core';
import {Doc} from '../types/document';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  host = environment.backend + '/requests';


  constructor(private httpSvc: HttpClient) { }

  public saveToStorage(doc: Doc): Observable<Object> {
   return this.httpSvc.post(this.host + '/new', doc);
  }

  public getAllRequests() {
    return this.httpSvc.get(this.host + '');
  }

  public getRequestById(id: Number) {
    return this.httpSvc.get(this.host + '/' + id);
  }

  public deleteRequest(request: Doc) {
    return this.httpSvc.post(this.host + '/delete', request);
  }

}
