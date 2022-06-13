import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Doc} from '../types/document';
import {CommunityEvent} from '../types/communityEvent';
import {EventService} from '../services/event.service';
import {NewslettersService} from '../services/newsletters.service';
import {LoginService} from '../services/login.service';
import {GeneralService} from '../services/general.service';


@Component({
  selector: 'app-annoncement',
  templateUrl: './annoncement.component.html',
  styleUrls: ['./annoncement.component.css']
})
export class AnnoncementComponent implements OnInit {
  @ViewChild('external') external: ElementRef;
  events: CommunityEvent[];
  documents: Doc[] = [];
  listOfCategories: String[];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;

  constructor(private eventService: EventService,
              private newslettersService: NewslettersService,
              private loginService: LoginService,
              private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.newslettersService.getAllNewsletters().subscribe((newsletters: Doc[]) => {
      this.documents = newsletters;
      this.listOfCategories = [...new Set(newsletters.map(item => item.category))];
    });
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


  }

  showFile(item) {

  }


  handleFileInput(files: FileList) {
    // Limit file size to 5MB
    if (files.item(0).size > 5000000 ) {
      return;
    }

    // Open Confirm Modal
    // this.fileToUpload = files.item(0);
    // this.showUploadModal = true;
  }


}

