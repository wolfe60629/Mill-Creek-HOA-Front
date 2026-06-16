import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Doc} from '../types/document';
import {environment} from '../../environments/environment';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
     host = environment.backend + '/documents';


  constructor(private httpSvc: HttpClient) { }


  public saveToStorage(doc: Doc): Observable<Object> {
     return this.httpSvc.post(this.host + '/new', doc);
  }

  public updateDocument(document: Doc): Observable<Object> {
    return this.httpSvc.post(this.host + '/update', {
      id: document.id,
      friendlyName: document.friendlyName,
      description: document.description,
    });
  }

  public getAllDocuments() {
     return this.httpSvc.get(this.host + '');
  }

  public getDocumentById(id: number) {
      return this.httpSvc.get(this.host + '/' + id);
  }

    public deleteDocument(document: Doc): Observable<Object> {
        return this.httpSvc.post(this.host + '/delete', document);
    }

}
