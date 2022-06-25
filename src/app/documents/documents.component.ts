import {Component, Inject, Injectable, OnInit, Output} from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import {Observable, ReplaySubject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ViewerComponent} from './viewer/viewer.component';
import {Doc} from '../types/document';
import {ConfirmationService, MessageService} from 'primeng/api';
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
  isTryingToDelete: boolean = false;

  @Output() showUploadModal: Boolean;
  showViewerModal: Boolean;

  constructor(private documentsService: DocumentsService,
              private sanitizer: DomSanitizer,
              private messageService: MessageService,
              private loginService: LoginService,
              private confirmationService: ConfirmationService) {}

  public ngOnInit() {
    this.loginService.checkAuthToken();

    this.documentsService.getAllDocuments().subscribe((result: Doc[]) => {
      this.documents = result;

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

  showFile(id: Number) {
    if (!this.isTryingToDelete && id) {
      this.documentsService.getDocumentById(id).subscribe((document: Doc) => {
        this.mainfestHtml = document.item;
      });

      this.showViewerModal = true;
    }
    }

  onDelete(doc: Doc) {
    this.isTryingToDelete = true;
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete?',
      key: 'confirm',
      accept: () => {
        this.showViewerModal = false;
        this.documentsService.deleteDocument(doc).subscribe(() => {
              this.messageService.add({severity: 'success', summary: 'Request Deleted Successfully!'});
              this.documentsService.getAllDocuments().subscribe(((documentArr: Doc[]) => {
                this.documents = documentArr;
              }));
            }
        , (err) => {
              this.messageService.add({severity: 'error', summary: err});
            });
        this.isTryingToDelete  = false;
      },
      reject: () => {
        this.isTryingToDelete = false;
      }
    });
  }
  }
