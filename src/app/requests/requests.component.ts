import {Component, OnInit, Output, SecurityContext} from '@angular/core';
import {Doc} from '../types/document';
import {DocumentsService} from '../services/documents.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RequestsService} from '../services/requests.service';
import {PDFDocument} from 'pdf-lib';


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
  pdfDocument: PDFDocument;

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

  showFile(doc: Doc) {
    if (doc.item) {
      this.mainfestHtml = doc.item;
      this.showViewerModal = true;
    }
  }

  showFile1 (doc: Doc) {
    const pdfDoc =  PDFDocument.load(doc.item.toString()).then(document => {
      const editableColumns: String[] = JSON.parse(doc.editableColumns.toString());

      // // Edit The PDF
      // const documentForm = document.getForm();
      // editableColumns.forEach(column => {
      //   documentForm.getTextField(column.toString()).setText('Test');
      // });


      const documentForm = document.getForm();
      const fields = documentForm.getFields();

      fields.forEach(field => {
        const type = field.constructor.name;
        const name = field.getName();
        console.log(`${type}: ${name}`);
      });

      document.save();

      // Show the pdf in another window
      document.saveAsBase64().then(b64 => {
       const pdfWindow = window.open('data:application/pdf;base64,' + b64, '_blank');
       pdfWindow.document.write('<iframe width=\'100%\' height=\'100%\' src=\'data:application/pdf;base64, ' + encodeURI(b64) + '\'></iframe>');
      });
    });

  }
}
