import { Component, OnInit } from '@angular/core';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
