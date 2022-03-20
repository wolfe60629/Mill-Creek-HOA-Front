import {Component, Inject, Injectable, OnInit, Output} from '@angular/core';
import { DocumentsService } from './documents.service'
import {Observable, ReplaySubject} from 'rxjs';
import {Doc, DocumentContainer} from './document';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ViewerComponent} from './viewer/viewer.component';


@Component({
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService],
})
export class DocumentsComponent implements OnInit {
  tabOption = 0;
  documents: Doc[] = [];
  listOfCategories: String[];
  fileToUpload: File | null = null;
  mainfestHtml: String;


  @Output() showUploadModal: Boolean;
  showViewerModal: Boolean;

  constructor(private documentsService: DocumentsService, private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    this.documentsService.getAllAsJson().then((jsonObject) => {
      // Get the document container
      const documentContainer = {docmap: jsonObject} as DocumentContainer;

      // Add all documents in array
      for (const key in documentContainer.docmap) {
        this.documents.push(documentContainer.docmap[key]);
      }
      console.log(this.documents);

      // List of all categories
      this.listOfCategories = [...new Set(this.documents.map(document => document.category))];
      });
    }

  handleFileInput(files: FileList) {
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
