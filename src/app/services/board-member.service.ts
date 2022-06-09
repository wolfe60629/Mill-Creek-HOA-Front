import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../types/document';
import {Observable} from 'rxjs';
import {BoardMember} from '../types/boardMember';

@Injectable({
  providedIn: 'root'
})
export class BoardMemberService {
  host = environment.backend + '/boardMembers';

  constructor(private httpSvc: HttpClient) { }

  public saveNewBoardMember(boardMember: BoardMember): Observable<any> {
    return this.httpSvc.post(this.host + '/new', boardMember);
  }

  public getAllBoardMembers(): Observable<any> {
    return this.httpSvc.get(this.host + '');
  }

}
