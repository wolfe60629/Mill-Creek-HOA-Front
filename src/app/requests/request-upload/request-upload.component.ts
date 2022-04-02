import {Component, Input, OnInit, Output} from '@angular/core';
import {DocumentsComponent} from '../../documents/documents.component';
import {DocumentsService} from '../../services/documents.service';
import {Observable, ReplaySubject} from 'rxjs';
import {RequestsComponent} from '../requests.component';
import {RequestsService} from '../../services/requests.service';
import {PDFDocument} from 'pdf-lib';

@Component({
  selector: 'app-request-upload',
  templateUrl: './request-upload.component.html',
  styleUrls: ['./request-upload.component.css']
})
export class RequestUploadComponent implements OnInit {
  @Input() showUploadModal;
  @Input() fileToUpload: File;
  @Output() documentName = '';
  @Output() description = '';
  @Output() category = {
    name: 'Request'
  };

  editableColumns = [];
  currentEditableColumnValue: String = '';

  constructor(private requestsComponent: RequestsComponent, private requestsService: RequestsService) { }

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
          category: this.category.name,
          editableColumns: JSON.stringify(Array.from(fieldMap))
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

  addEditableColumn () {
    if (this.currentEditableColumnValue.trim().length > 0) {
    this.editableColumns.push(this.currentEditableColumnValue.trim());
    this.currentEditableColumnValue = '';
    }
  }

  resetEditableColumns() {
    this.editableColumns = [];
    this.currentEditableColumnValue = '';
  }
}
