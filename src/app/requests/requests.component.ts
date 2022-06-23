import {Component, OnInit, Output, SecurityContext} from '@angular/core';
import {Doc} from '../types/document';
import {DocumentsService} from '../services/documents.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RequestsService} from '../services/requests.service';
import {PDFDocument} from 'pdf-lib';
import {LoginService} from '../services/login.service';
import {ConfirmationService, MessageService} from 'primeng/api';


@Component({
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [],
})
export class RequestsComponent implements OnInit {
  requests: Doc[] = [];
  listOfCategories: String[];
  fileToUpload: File | null = null;
  mainfestHtml: String;
  isRequest: boolean;
  pdfDocument: PDFDocument;

  @Output() showUploadModal: Boolean;
  showViewerModal: Boolean;
  isAdmin: boolean;

  constructor(private requestsService: RequestsService,
              private sanitizer: DomSanitizer,
              private loginService: LoginService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  public ngOnInit() {
    this.loginService.checkAuthToken();


    this.requestsService.getAllRequests().subscribe((result: Doc[]) => {
      this.requests = result;

      this.listOfCategories = [...new Set(result.map(item => item.category))];
    });

    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
  }

  handleFileInput(files: FileList) {
    // Limit file size to 5MB
    if (files.item(0).size > 5000000) {
      return;
    }

    // Open Confirm Modal
    this.fileToUpload = files.item(0);
    this.showUploadModal = true;
  }

  showFile(doc: Doc) {
    if (doc.id) {
      this.requestsService.getRequestById(doc.id).subscribe((request: Doc) => {
        this.mainfestHtml = request.item;
        this.isRequest = request.category === 'Requests';
      });
        this.showViewerModal = true;
    }
  }

  onDelete(doc: Doc) {
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete?',
      key: 'confirm',
      accept: () => {
        this.showViewerModal = false;
        this.requestsService.deleteRequest(doc).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Request Deleted Successfully!'});
        }
      );
      }
    });
  }
}
