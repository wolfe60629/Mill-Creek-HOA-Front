import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventService } from '../../services/event.service';
import { GeneralService } from '../../services/general.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CommunityEvent } from '../../types/communityEvent';

export interface EventDetailView {
  title: string;
  when: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: false,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Output() eventOpen = new EventEmitter<EventDetailView>();
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions;

  constructor(
    private eventService: EventService,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.calendarOptions = {
      editable: false,
      selectable: false,
      themeSystem: 'standard',
      height: 'auto',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: '',
      },
      locale: 'en',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      events: [],
      eventClick: this.onEventClick.bind(this),
      eventDisplay: 'block',
      dayMaxEvents: 3,
    };
  }

  ngAfterViewInit(): void {
    this.refreshEvents();
  }

  refreshEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.applyEvents(Array.isArray(events) ? events : []);
    });
  }

  onEventClick(arg: EventClickArg): void {
    const startDate = arg.event.start;
    const endDate = arg.event.end;
    let when = startDate
      ? this.generalService.formatTimeAndDate(startDate)
      : 'Date not set';

    if (endDate) {
      when += ' – ' + this.generalService.formatTimeAndDate(endDate);
    }

    this.eventOpen.emit({
      title: arg.event.title,
      when,
      location: arg.event.extendedProps['location'] || '',
      description: arg.event.extendedProps['description'] || '',
    });
  }

  private applyEvents(events: CommunityEvent[]): void {
    const eventInput: EventInput[] = events.map(event => ({
      id: String(event.id),
      title: event.eventName,
      start: new Date(event.startDate),
      end: event.endDate ? new Date(event.endDate) : undefined,
      extendedProps: {
        description: event.description ?? '',
        location: event.location ?? '',
      },
    }));

    const api = this.calendarComponent?.getApi();
    if (api) {
      api.removeAllEvents();
      api.addEventSource(eventInput);
    }
  }
}
