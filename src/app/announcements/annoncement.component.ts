import { Component, OnInit } from '@angular/core';
import { Doc } from '../types/document';
import { CommunityEvent } from '../types/communityEvent';
import { DocumentsService } from '../services/documents.service';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
import { GeneralService } from '../services/general.service';

@Component({
    selector: 'app-announcements',
    templateUrl: './annoncement.component.html',
    styleUrls: ['./annoncement.component.css'],
    standalone: false
})
export class AnnoncementComponent implements OnInit {
  isAdmin: boolean;
  events: CommunityEvent[] = [];
  documents: Doc[] = [];
  listOfCategories: string[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  src?: string;
  fileToUpload: File | null = null;
  showUploadModal: boolean = false;

  constructor(private documentsService: DocumentsService,
              private eventService: EventService,
              private loginService: LoginService,
              public generalService: GeneralService) {}

  ngOnInit(): void {
    this.loginService.checkAuthToken();

    this.eventService.getAllEvents().subscribe((events: CommunityEvent[]) => {
      const firstThree = events.slice(0, 3).map((evt) => {
        const normalized: CommunityEvent = { ...evt } as CommunityEvent;
        normalized.startDate = new Date(evt.startDate);
        if (evt.endDate) {
          normalized.endDate = new Date(evt.endDate);
        }
        return normalized;
      });
      this.events = [...firstThree];
    });

    this.documentsService.getAllDocuments().subscribe((result: Doc[]) => {
      this.documents = result;
      this.listOfCategories = [...new Set(result.map(item => item.category))];
    });

    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
  }

  handleFileInput(files: FileList) {
    if (!files || files.length === 0) {
      return;
    }

    if (files.item(0).size > 5000000 ) {
      return;
    }

    this.fileToUpload = files.item(0);
    this.showUploadModal = true;
  }

  showNewsletter(document: Doc) {
    if (!document) {
      return;
    }
    this.src = document.item;
  }
}


