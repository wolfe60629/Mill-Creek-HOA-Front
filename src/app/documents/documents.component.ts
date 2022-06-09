import {Component, Inject, Injectable, OnInit, Output} from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import {Observable, ReplaySubject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ViewerComponent} from './viewer/viewer.component';
import {Doc} from '../types/document';
import {MessageService} from 'primeng/api';
import {LoginService} from '../services/login.service';
import {asNumber} from 'pdf-lib';


@Component({
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService],
})
export class DocumentsComponent implements OnInit {
  isAdmin: boolean;
  documents: Doc[] = [];
  listOfCategories: String[];
  fileToUpload: File | null = null;
  mainfestHtml: String;


  @Output() showUploadModal: Boolean;
  showViewerModal: Boolean;

  constructor(private documentsService: DocumentsService,
              private sanitizer: DomSanitizer,
              private messageService: MessageService,
              private loginService: LoginService) {}

  public ngOnInit() {
    this.loginService.checkAuthToken();

    this.documentsService.getAllDocuments().subscribe((result: Doc[]) => {
      this.documents = result;
      this.documents.sort((a, b) => (a.id > b.id) ? 1 : (a.id === b.id) ? ((a.id > b.id) ? 1 : -1) : -1 );


      this.listOfCategories = [... new Set(result.map(item => item.category))];
    });

    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
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
