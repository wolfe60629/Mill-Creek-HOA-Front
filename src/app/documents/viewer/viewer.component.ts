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
         this.src = this.updateSrc(changes.manifestHtml.currentValue);
         console.log(this.src.toString());
       }

    }

  ngOnInit(): void {
  }

  updateSrc(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + url.toString());
  }

/*  async createPdf(url) {
    const pdfDoc = await PDFDocument.load(url).then( (doc) => {
          const nameField = doc.getForm().getTextField('Name');
          nameField.setText('Testing');

          doc.save().then((bytes) =>  {
            const file = new Blob([bytes], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
      });
    });
  }*/
}
