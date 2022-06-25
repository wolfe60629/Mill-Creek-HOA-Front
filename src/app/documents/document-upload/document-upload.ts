import {Component, Injectable, Input, OnInit, Output} from '@angular/core';
import {DocumentsComponent} from '../documents.component';
import {Observable, ReplaySubject} from 'rxjs';
import {DocumentsService} from '../../services/documents.service';
import {MessageService} from 'primeng/api';
import {Doc} from '../../types/document';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
   @Input() showUploadModal;
   @Input() fileToUpload: File;
   @Output() documentName = '';
   @Output() description = '';
   @Output() category = {
       name: ''
   };

    private output: String[];

  constructor(private documentsComponent: DocumentsComponent,
              private documentsService: DocumentsService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  setShowUploadModal (bool) {
    this.documentsComponent.showUploadModal = bool;
  }

  onSubmit() {
    this.setShowUploadModal(false);
    this.convertFile(this.fileToUpload).subscribe((converted) => {
       this.documentsService.saveToStorage({
         friendlyName: this.documentName,
         name: this.fileToUpload.name,
         description: this.description,
         item: converted,
           category: this.category.name
       }).subscribe(response => {
               this.messageService.add({severity: 'success', summary: 'Document Uploaded Successfully'});
           this.documentsService.getAllDocuments().subscribe((result: Doc[]) => {
               this.documentsComponent.documents = result;
               this.documentsComponent.listOfCategories = [... new Set(result.map(item => item.category))];
           });
           }
       );
    });
  }

    convertFile(file: File): Observable<string> {
      const result = new ReplaySubject<string>(1);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => result.next(btoa(event.target.result.toString()));
      return result;
    }

    search(event) {
        this.output = this.documentsComponent.listOfCategories.filter(c => c.startsWith(event.query));
    }
}
