import {Component, Input, OnInit, Output} from '@angular/core';
import {NewslettersService} from '../../services/newsletters.service';
import {MessageService} from 'primeng/api';
import {AnnoncementComponent} from '../annoncement.component';
import {Doc} from '../../types/document';
import {Observable, ReplaySubject} from 'rxjs';


@Component({
  selector: 'app-newsletter-upload',
  templateUrl: './newsletter-upload.component.html',
  styleUrls: ['./newsletter-upload.component.css']
})
export class NewsletterUploadComponent implements OnInit {
  @Input() showUploadModal;
  @Input() fileToUpload: File;
  @Output() documentName = '';
  @Output() description = '';


  private output: String[];

  constructor(private announcementComponent: AnnoncementComponent,
              private newslettersService: NewslettersService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  setShowUploadModal (bool) {
    this.announcementComponent.showUploadModal = bool;
  }

  onSubmit() {
    this.setShowUploadModal(false);
    this.convertFile(this.fileToUpload).subscribe((converted) => {
      this.newslettersService.saveToStorage({
        friendlyName: this.documentName,
        name: this.fileToUpload.name,
        description: this.description,
        item: converted,
        category: 'Newsletter Archive'
      }).subscribe(response => {
            this.messageService.add({severity: 'success', summary: 'Document Uploaded Successfully'});
            this.newslettersService.getAllNewsletters().subscribe((result: Doc[]) => {
              this.announcementComponent.documents = result;
              this.announcementComponent.listOfCategories = [... new Set(result.map(item => item.category))];
              this.announcementComponent.showNewsletter(result[0]);
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
}
