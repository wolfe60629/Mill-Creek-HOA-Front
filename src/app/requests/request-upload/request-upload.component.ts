import {Component, Input, OnInit, Output} from '@angular/core';
import {DocumentsComponent} from '../../documents/documents.component';
import {DocumentsService} from '../../services/documents.service';
import {Observable, ReplaySubject} from 'rxjs';
import {RequestsComponent} from '../requests.component';
import {RequestsService} from '../../services/requests.service';
import {PDFDocument} from 'pdf-lib';
import {Doc} from '../../types/document';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-request-upload',
  templateUrl: './request-upload.component.html',
  styleUrls: ['./request-upload.component.css']
})
export class RequestUploadComponent implements OnInit {
  categories = ['Requests', 'Information'];
  @Input() showUploadModal;
  @Input() fileToUpload: File;
  @Output() documentName = '';
  @Output() description = '';
  @Output() category = 'Requests';

  constructor(private requestsComponent: RequestsComponent,
              private requestsService: RequestsService,
              private messageService: MessageService) { }

  ngOnInit(): void {

  }

  setShowUploadModal (bool) {
    this.requestsComponent.showUploadModal = bool;
  }

  onSubmit() {
    this.setShowUploadModal(false);

    this.convertFile(this.fileToUpload).subscribe((converted) => {
      PDFDocument.load(converted).then(doc => {
        const fieldMap = new Map;
         doc.getForm().getFields().forEach(field => {
           const type = field.constructor.name;
           const name = field.getName();
           fieldMap.set(name, type);
         });
         return fieldMap;
      }).then (fieldMap => {
        this.requestsService.saveToStorage({
          friendlyName: this.documentName,
          name: this.fileToUpload.name,
          description: this.description,
          item: converted,
          category: this.category,
          editableColumns: JSON.stringify(Array.from(fieldMap))
        }).subscribe(() => {
          this.requestsService.getAllRequests().subscribe((requests: Doc[]) => {
            this.messageService.add({severity: 'success', summary: 'Document Uploaded Successfully'});
            this.requestsComponent.requests = requests;
            this.requestsComponent.listOfCategories = [... new Set(requests.map(item => item.category))];
          });
        });
      });
    });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
