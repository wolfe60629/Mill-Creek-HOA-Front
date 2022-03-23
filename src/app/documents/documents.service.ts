import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Doc} from './document';
import {environment} from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
     host = environment.backend + '/documents';


  constructor(private httpSvc: HttpClient) { }


  public saveToStorage(doc: Doc) {
      this.httpSvc.post(this.host + '/new', doc).subscribe(response => console.log(response));
  }

  public getAllDocuments() {
     return this.httpSvc.get(this.host + '');
  }

}
