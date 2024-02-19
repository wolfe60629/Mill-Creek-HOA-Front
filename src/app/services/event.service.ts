import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BoardMember} from '../types/boardMember';
import {Observable} from 'rxjs';
import {CommunityEvent} from '../types/communityEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  host = environment.backend + '/events';

  constructor(private httpSvc: HttpClient) { }

  public saveNewEvent(communityEvent: CommunityEvent): Observable<any> {
    return this.httpSvc.post(this.host + '/new', communityEvent);
  }

 public deleteEvent(communityEvent: CommunityEvent): Observable<any> {
    return this.httpSvc.post(this.host + '/delete', communityEvent);
  }

  public getAllEvents(): Observable<any> {
    return this.httpSvc.get(this.host + '');
  }
}
