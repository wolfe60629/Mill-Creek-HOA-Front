import { Component, OnInit } from '@angular/core';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-amenities',
    templateUrl: './amenities.component.html',
    styleUrls: ['./amenities.component.css'],
    standalone: false
})
export class AmenitiesComponent implements OnInit {
  visibleSidebar1: boolean;
  visibleSidebar2: boolean;

  constructor(private location: Location) { }

  ngOnInit(): void {
    // if ?poolRules is in the URL, open the pool rules sidebar
    if (window.location.href.includes('?poolRules=true')) {
      this.visibleSidebar1 = true;
    }

    // if ?courtRules is in the URL, open the court rules sidebar
    if (window.location.href.includes('?courtRules=true')) {
      this.visibleSidebar2 = true;
    }
  }

  openCourtRules() {
    // Add ?courtRules=true to the end of the URL
    this.location.replaceState(this.location.path() + '?courtRules=true');
    this.visibleSidebar2 = true;
  }

  openPoolRules() {
    // Add ?courtRules=true to the end of the URL
    this.location.replaceState(this.location.path() + '?poolRules=true');
    this.visibleSidebar1 = true;
  }

  closeRules() {
    this.visibleSidebar1 = false;
    this.visibleSidebar2 = false;

    // remove ? from href
    this.location.replaceState(this.location.path().split("?")[0]);
  }
}
