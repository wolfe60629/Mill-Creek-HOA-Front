import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import {Doc} from '../types/document';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';
import {LoginService} from '../services/login.service';
import {GeneralService} from '../services/general.service';
 


@Component({
    selector: 'app-events',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    standalone: false
})
export class EventComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  isAdmin: boolean;
  events: CommunityEvent[];
  documents: Doc[] = [];
  listOfCategories: string[];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  src?: string;
  fileToUpload: File | null = null;

  @Output() showUploadModal: boolean;

  // Inline add-event form (admin only)
  showAddForm: boolean = false;
  newEventName: string = '';
  newEventDescription: string = '';
  newEventLocation: string = '';
  newEventStart: string = '';
  newEventEnd: string = '';

  constructor(private eventService: EventService,
              private loginService: LoginService,
              protected generalService: GeneralService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loginService.checkAuthToken();
    this.eventService.getAllEvents().subscribe((events: CommunityEvent[]) => {
      this.events = events.slice(0, 3);

      this.events.forEach(event => {
        event.startDate = new Date(event.startDate);

        if (event.endDate) {
            event.endDate = new Date(event.endDate);
        }
      });

      this.events = [...this.events];
    });

    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
  }

  openAddEvent() {
    this.showAddForm = true;
  }

  cancelAddEvent() {
    this.showAddForm = false;
    this.newEventName = '';
    this.newEventDescription = '';
    this.newEventLocation = '';
    this.newEventStart = '';
    this.newEventEnd = '';
  }

  saveNewEvent() {
    if (!this.newEventName || !this.newEventStart) {
      this.messageService.add({ severity: 'warn', summary: 'Event name and start date/time are required.' });
      return;
    }

    const payload: CommunityEvent = {
      eventName: this.newEventName,
      description: this.newEventDescription || undefined,
      location: this.newEventLocation || undefined,
      startDate: new Date(this.newEventStart),
      endDate: this.newEventEnd ? new Date(this.newEventEnd) : null,
      readonly: true,
    } as CommunityEvent;

    this.eventService.saveNewEvent(payload).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Event added' });
      this.cancelAddEvent();
      this.eventService.getAllEvents().subscribe((events: CommunityEvent[]) => {
        this.events = events.slice(0, 3).map(evt => ({
          ...evt,
          startDate: new Date(evt.startDate),
          endDate: evt.endDate ? new Date(evt.endDate) : null
        } as CommunityEvent));
      });
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Failed to add event' });
    });
  }
}

