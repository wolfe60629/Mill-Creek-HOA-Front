import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { GeneralService } from '../services/general.service';
import { CommunityEvent } from '../types/communityEvent';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  upcomingEvents: CommunityEvent[] = [];
  eventsLoaded = false;

  monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  aboutHighlights = [
    {
      icon: 'groups',
      title: 'Neighbors on the Board',
      text: 'Board members are homeowners who live here and use the same pools you do.',
    },
    {
      icon: 'forum',
      title: 'We Listen',
      text: 'Resident feedback shapes how we prioritize projects and spending.',
    },
  ];

  amenityPreviews = [
    {
      image: 'assets/ammenities-pool.png',
      title: 'Community Pools',
      detail: 'The Manor & The Falls · open Memorial Day weekend',
    },
    {
      image: 'assets/ammenities-tennis.png',
      title: 'Tennis Courts',
      detail: 'Doubles court at The Falls',
    },
    {
      image: 'assets/ammenities-basketball.png',
      title: 'Basketball Courts',
      detail: 'Quad court at The Manor',
    },
  ];

  constructor(
    private eventService: EventService,
    protected generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events: CommunityEvent[]) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        this.upcomingEvents = events
          .map(event => ({
            ...event,
            startDate: new Date(event.startDate),
            endDate: event.endDate ? new Date(event.endDate) : null,
          }))
          .filter(event => event.startDate >= now)
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          .slice(0, 3);

        this.eventsLoaded = true;
      },
      error: () => {
        this.eventsLoaded = true;
      },
    });
  }
}
