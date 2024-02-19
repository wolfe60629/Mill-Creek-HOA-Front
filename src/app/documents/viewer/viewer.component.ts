import {Component, EventEmitter, Injectable, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {NgModel} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnChanges {
  @Input() showViewerModal: boolean = false;
  @Output() showViewerModalChange = new EventEmitter<boolean>();

  @Input() manifestHtml: String;
  @Output() manifestHtmlChange = new EventEmitter<String>();

  src: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
       if (changes.manifestHtml) {
         this.src = changes.manifestHtml.currentValue;
       }

       if (changes.showViewerModal) {
           this.showViewerModal = changes.showViewerModal.currentValue;
       }
   }

  ngOnInit(): void {
  }
}
