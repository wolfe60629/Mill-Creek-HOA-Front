import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommunityEvent } from '../types/communityEvent';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
import { GeneralService } from '../services/general.service';
import { CalendarComponent, EventDetailView } from './calendar/calendar.component';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  standalone: false,
})
export class EventComponent implements OnInit {
  @ViewChild('calendar') calendar?: CalendarComponent;

  isAdmin = false;
  events: CommunityEvent[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  showAddForm = false;
  editingEventId: number | null = null;

  newEventName = '';
  newEventDescription = '';
  newEventLocation = '';
  newEventStart = '';
  newEventEnd = '';

  editEventName = '';
  editEventDescription = '';
  editEventLocation = '';
  editEventStart = '';
  editEventEnd = '';

  showEventDetailModal = false;
  eventDetail: EventDetailView | null = null;

  constructor(
    private eventService: EventService,
    private loginService: LoginService,
    protected generalService: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loginService.checkAuthToken();
    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
    this.loadEvents();
  }

  openAddEvent(): void {
    this.cancelEdit();
    this.showAddForm = true;
  }

  cancelAddEvent(): void {
    this.showAddForm = false;
    this.newEventName = '';
    this.newEventDescription = '';
    this.newEventLocation = '';
    this.newEventStart = '';
    this.newEventEnd = '';
  }

  startEdit(event: CommunityEvent): void {
    this.cancelAddEvent();
    this.editingEventId = Number(event.id);
    this.editEventName = event.eventName ?? '';
    this.editEventDescription = event.description ?? '';
    this.editEventLocation = event.location ?? '';
    this.editEventStart = this.toDateTimeLocal(event.startDate);
    this.editEventEnd = this.toDateTimeLocal(event.endDate);
  }

  cancelEdit(): void {
    this.editingEventId = null;
    this.editEventName = '';
    this.editEventDescription = '';
    this.editEventLocation = '';
    this.editEventStart = '';
    this.editEventEnd = '';
  }

  saveNewEvent(): void {
    if (!this.newEventName.trim() || !this.newEventStart) {
      this.messageService.add({ severity: 'warn', summary: 'Event name and start date/time are required.' });
      return;
    }

    const payload: CommunityEvent = {
      eventName: this.newEventName.trim(),
      description: this.newEventDescription.trim() || undefined,
      location: this.newEventLocation.trim() || undefined,
      startDate: new Date(this.newEventStart),
      endDate: this.newEventEnd ? new Date(this.newEventEnd) : null,
    } as CommunityEvent;

    this.eventService.saveNewEvent(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Event added.' });
        this.cancelAddEvent();
        this.reloadEvents();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Failed to add event.' }),
    });
  }

  saveEdit(event: CommunityEvent): void {
    if (!this.editEventName.trim() || !this.editEventStart) {
      this.messageService.add({ severity: 'warn', summary: 'Event name and start date/time are required.' });
      return;
    }

    const payload: CommunityEvent = {
      ...event,
      eventName: this.editEventName.trim(),
      description: this.editEventDescription.trim() || undefined,
      location: this.editEventLocation.trim() || undefined,
      startDate: new Date(this.editEventStart),
      endDate: this.editEventEnd ? new Date(this.editEventEnd) : null,
    };

    this.eventService.saveNewEvent(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Event updated.' });
        this.cancelEdit();
        this.reloadEvents();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Failed to update event.' }),
    });
  }

  confirmDeleteEvent(event: CommunityEvent): void {
    this.confirmationService.confirm({
      key: 'confirm',
      header: 'Delete this event?',
      message: `"${event.eventName}" will be removed from the calendar and upcoming list.`,
      accept: () => {
        this.eventService.deleteEvent(event).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Event deleted.' });
            if (this.editingEventId === Number(event.id)) {
              this.cancelEdit();
            }
            this.reloadEvents();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Failed to delete event.' }),
        });
      },
    });
  }

  isEditing(event: CommunityEvent): boolean {
    return this.editingEventId === Number(event.id);
  }

  openEventDetail(event: CommunityEvent): void {
    if (this.isEditing(event)) {
      return;
    }

    let when = this.generalService.formatTimeAndDate(event.startDate) || 'Date not set';
    if (event.endDate) {
      when += ' – ' + this.generalService.formatTimeAndDate(event.endDate);
    }

    this.eventDetail = {
      title: event.eventName,
      when,
      location: event.location ?? '',
      description: event.description ?? '',
    };
    this.showEventDetailModal = true;
  }

  openEventDetailFromCalendar(detail: EventDetailView): void {
    this.eventDetail = detail;
    this.showEventDetailModal = true;
  }

  closeEventDetail(): void {
    this.showEventDetailModal = false;
    this.eventDetail = null;
  }

  private loadEvents(): void {
    this.eventService.getAllEvents().subscribe((events: CommunityEvent[]) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      this.events = (events ?? [])
        .map(event => ({
          ...event,
          startDate: new Date(event.startDate),
          endDate: event.endDate ? new Date(event.endDate) : null,
        }))
        .filter(event => event.startDate >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    });
  }

  private reloadEvents(): void {
    this.loadEvents();
    this.calendar?.refreshEvents();
  }

  private toDateTimeLocal(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const pad = (part: number) => String(part).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}
