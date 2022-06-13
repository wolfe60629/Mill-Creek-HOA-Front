import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  formatTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    const strTime = hours + ':' + (minutes === 0 ? '00' : minutes) + ' ' + ampm;
    return strTime;
  }


  formatTimeAndDate(date) {
    const newDate = new Date(date);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    const strTime = hours + ':' + (minutes === 0 ? '00' : minutes) + ' ' + ampm;
    const strMonth = newDate.getUTCMonth() + 1;
    const strDay = newDate.getDate();
    const strYear = newDate.getFullYear();
    const strDate = strMonth + '/' + strDay + '/' + strYear;
    return strDate + ' ' + strTime;
  }

  formatUTCTimeAndUTCDate(date) {
    const newDate = new Date(date);
    let hours = newDate.getUTCHours();
    let minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    const strTime = hours + ':' + (minutes === 0 ? '00' : minutes) + ' ' + ampm;
    const strMonth = newDate.getUTCMonth() + 1;
    const strDay = newDate.getDate();
    const strYear = newDate.getFullYear();
    const strDate = strMonth + '/' + strDay + '/' + strYear;
    return strDate + ' ' + strTime;
  }
}
