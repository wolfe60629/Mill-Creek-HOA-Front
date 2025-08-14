import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { Doc } from '../../types/document';

@Component({
  selector: 'app-newsletter-upload',
  template: `
    <div class="overlay" *ngIf="showUploadModal">
      <div class="modal">
        <h3>Upload Newsletter</h3>
        <p *ngIf="!uploading && !uploaded && !errorMessage">Ready to upload: {{ fileToUpload?.name }}</p>
        <p *ngIf="uploading">Uploading...</p>
        <p *ngIf="uploaded">Upload complete.</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
        <div class="actions">
          <button type="button" (click)="startUpload()" [disabled]="uploading || uploaded">Upload</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: #ffffff; padding: 1rem 1.25rem; border-radius: 8px; width: min(92vw, 480px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    h3 { margin: 0 0 0.5rem 0; }
    .actions { margin-top: 0.75rem; display: flex; gap: 0.5rem; justify-content: flex-end; }
    button { padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid #dee2e6; background: #0d6efd; color: #fff; cursor: pointer; }
    button[disabled] { background: #adb5bd; cursor: not-allowed; }
    .error { color: #dc3545; }
    `
  ],
  standalone: false
})
export class NewsletterUploadComponent implements OnChanges {
  @Input() fileToUpload: File | null = null;
  @Input() showUploadModal: boolean = false;

  uploading: boolean = false;
  uploaded: boolean = false;
  errorMessage: string | null = null;

  constructor(private documentsService: DocumentsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['showUploadModal'] || changes['fileToUpload']) && this.showUploadModal && this.fileToUpload && !this.uploaded && !this.uploading) {
      // Auto-start upload when modal becomes visible and a file is present
      this.startUpload();
    }
  }

  async startUpload(): Promise<void> {
    if (!this.fileToUpload) {
      this.errorMessage = 'No file selected.';
      return;
    }

    // Guard: limit to ~5MB like caller
    if (this.fileToUpload.size > 5000000) {
      this.errorMessage = 'File too large (max 5 MB).';
      return;
    }

    this.errorMessage = null;
    this.uploading = true;

    try {
      const base64 = await this.readFileAsBase64(this.fileToUpload);
      const stripped = this.stripDataUrlPrefix(base64);

      const now = new Date();
      const doc: Doc = {
        friendlyName: this.fileToUpload.name,
        name: this.fileToUpload.name,
        description: `Newsletter ${now.toLocaleDateString()}`,
        item: stripped,
        category: 'Newsletter'
      };

      this.documentsService.saveToStorage(doc).subscribe({
        next: () => {
          this.uploaded = true;
          this.uploading = false;
        },
        error: (err) => {
          this.uploading = false;
          this.errorMessage = 'Upload failed. Please try again later.';
          // eslint-disable-next-line no-console
          console.error('Newsletter upload failed', err);
        }
      });
    } catch (e) {
      this.uploading = false;
      this.errorMessage = 'Could not read file.';
      // eslint-disable-next-line no-console
      console.error('File read failed', e);
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  private stripDataUrlPrefix(dataUrl: string): string {
    const commaIndex = dataUrl.indexOf(',');
    if (commaIndex === -1) {
      return dataUrl;
    }
    return dataUrl.substring(commaIndex + 1);
  }
}


