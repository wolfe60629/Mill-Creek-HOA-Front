import {Component, Inject, Injectable, OnInit, Output} from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import {Observable, ReplaySubject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ViewerComponent} from './viewer/viewer.component';
import {Doc} from '../types/document';


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
    this.documentsService.getAllDocuments().subscribe((result: Doc[]) => {
      this.documents = result;

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
