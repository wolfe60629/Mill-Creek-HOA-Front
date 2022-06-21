import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Calendar, EventInput} from '@fullcalendar/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {CommunityEvent} from '../../types/communityEvent';
import {EventService} from '../../services/event.service';
import {GeneralService} from '../../services/general.service';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  options: any;
  calendarOptions: CalendarOptions;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('fullCalModal') fullCalModal: ElementRef;
  @ViewChild('modalTitle') modalTitle: ElementRef;
  @ViewChild('modalDescription') modalDescription: ElementRef;
  @ViewChild('modalLocation') modalLocation: ElementRef;
  @ViewChild('modalDate') modalDate: ElementRef;
  communityEvents = [];
  constructor(private eventService: EventService,
              private generalService: GeneralService) {
    const name = Calendar.name;
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      const eventInput: EventInput[] = events.map(event => {
        return {
          id: event.id,
          title: event.eventName,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          description: event.description,
          location: event.location
        };
      });

      this.communityEvents.push(...eventInput);
    });

    this.calendarOptions = {
      editable: true,
      themeSystem: 'standard',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locale: 'en',
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin],
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      dateClick: this.getAppointmentsForSpecificDate.bind(this),
      events: this.communityEvents,
      eventMouseEnter: (event: EventInput) => {
        // Show Modal
        this.fullCalModal.nativeElement.style.display = 'unset';
        this.modalTitle.nativeElement.innerText = event.event.title;
        const startDate = event.event._instance.range.start;
        const endDate  = event.event._instance.range.end;

        // Add description and location of event
        if (event.event.extendedProps.description) {
          this.modalDescription.nativeElement.innerText = event.event.extendedProps.description;
        } else {
          this.modalDescription.nativeElement.innerText = 'No description of this event';
        }

        if (event.event.extendedProps.location) {
          this.modalLocation.nativeElement.innerText = event.event.extendedProps.location;
        } else {
          this.modalLocation.nativeElement.innerText = 'A location has not been set';
        }

        this.modalDate.nativeElement.innerText =  this.generalService.formatUTCTimeAndUTCDate(startDate);
        if (endDate) {
          this.modalDate.nativeElement.innerText += ' - ' + this.generalService.formatUTCTimeAndUTCDate(endDate);
        }
      },
      eventMouseLeave: (event) => {
        if (!this.fullCalModal.nativeElement.matches(':hover')) {
          this.fullCalModal.nativeElement.style.display = 'none';
        }

        this.fullCalModal.nativeElement.addEventListener('mouseleave', e => {
          this.fullCalModal.nativeElement.style.display = 'none';
        });
      }
    };
  }
  getAppointmentsForSpecificDate(arg) {
    console.log(arg);
  }




}
