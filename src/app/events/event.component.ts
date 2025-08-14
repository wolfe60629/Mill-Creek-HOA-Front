import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {Doc} from '../types/document';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';
import {LoginService} from '../services/login.service';
import {GeneralService} from '../services/general.service';
 


@Component({
    selector: 'app-annoncement',
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

  constructor(private eventService: EventService,
              private loginService: LoginService,
              protected generalService: GeneralService) {
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
}

