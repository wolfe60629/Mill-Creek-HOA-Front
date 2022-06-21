import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Doc} from '../types/document';
import {Observable} from 'rxjs';
import {Setting} from '../types/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  host = environment.backend + '/settings';


  constructor(private httpSvc: HttpClient) { }


  public saveSetting(setting: Setting): Observable<Object> {
    return this.httpSvc.post(this.host + '/save', setting);
  }

  public getSettingByName(settingName: String) {
    return this.httpSvc.get(this.host + '/' + settingName);
  }

}
