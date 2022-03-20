import { Injectable } from '@angular/core';
import {observable, Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';

import {Doc} from './document';
import {AngularFireDatabase} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
uploadedFiles: String[];

  constructor(private httpSvc: HttpClient, private db: AngularFireDatabase) { }


  public saveToStorage(doc: Doc) {
    const ref = this.db.list('uploaded_files');


    ref.push(doc).then(() => {
          console.log('Successfully Saved File: ' + doc.fileName);
        }, (error) => {
          console.log(error);
        }
    );
  }

  public getAllAsJson(): Promise<any>  {
     return this.db.list('uploaded_files').query.get().then(data => data.toJSON());
  }

}
