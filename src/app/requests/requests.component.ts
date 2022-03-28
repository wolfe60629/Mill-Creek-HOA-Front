import {Component, OnInit, Output} from '@angular/core';
import {Doc} from '../types/document';
import {DocumentsService} from '../services/documents.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestsService} from '../services/requests.service';


@Component({
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [],
})
export class RequestsComponent implements OnInit {
  tabOption = 0;
  requests: Doc[] = [];
  listOfCategories: String[];
  fileToUpload: File | null = null;
  mainfestHtml: String;


  @Output() showUploadModal: Boolean;
  showViewerModal: Boolean;

  constructor(private requestsService: RequestsService, private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    this.requestsService.getAllRequests().subscribe((result: Doc[]) => {
      this.requests = result;

      this.listOfCategories = [... new Set(result.map(item => item.category))];
    });
  }

  handleFileInput(files: FileList) {
    // Limit file size to 5MB
    if (files.item(0).size > 5000000 ) {
      return;
    }

    // Open Confirm Modal
    this.fileToUpload = files.item(0);
    this.showUploadModal = true;
  }

  showFile(base64: String) {
    if (base64) {
      this.mainfestHtml = base64;
      this.showViewerModal = true;
    }
  }
}
