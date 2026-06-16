import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DocumentsService } from '../../services/documents.service';
import { Doc } from '../../types/document';

type CategoryType = 'Meeting Minutes' | 'Bylaws' | 'Other';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css'],
  standalone: false,
})
export class DocumentUploadComponent implements OnChanges {
  @Input({ required: true }) file!: File;
  @Input() categoryOptions: string[] = [];

  @Output() uploaded = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  visible = true;
  uploading = false;

  documentName = '';
  description = '';
  categoryType: CategoryType = 'Meeting Minutes';
  meetingYear = '';
  customCategory = '';
  categorySuggestions: string[] = [];

  readonly categoryTypes: { value: CategoryType; label: string }[] = [
    { value: 'Meeting Minutes', label: 'Meeting minutes' },
    { value: 'Bylaws', label: 'Bylaws' },
    { value: 'Other', label: 'Other' },
  ];

  constructor(
    private documentsService: DocumentsService,
    private messageService: MessageService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file']?.currentValue) {
      this.resetForm();
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  onClose(): void {
    if (this.uploading) {
      return;
    }

    this.closed.emit();
  }

  onCategorySearch(event: { query: string }): void {
    const query = event.query.trim().toLowerCase();
    this.categorySuggestions = this.categoryOptions.filter(category =>
      category.toLowerCase().includes(query),
    );
  }

  canSubmit(): boolean {
    if (this.uploading || !this.documentName.trim() || !this.description.trim()) {
      return false;
    }

    if (this.categoryType === 'Meeting Minutes') {
      return /^\d{4}$/.test(this.meetingYear.trim());
    }

    if (this.categoryType === 'Other') {
      return this.customCategory.trim().length > 0;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.canSubmit()) {
      this.messageService.add({ severity: 'warn', summary: 'Please complete all required fields.' });
      return;
    }

    this.uploading = true;

    this.convertFile(this.file).subscribe({
      next: converted => {
        const doc: Doc = {
          friendlyName: this.documentName.trim(),
          name: this.file.name,
          description: this.description.trim(),
          item: converted,
          category: this.resolveCategory(),
        };

        this.documentsService.saveToStorage(doc).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Document uploaded successfully.' });
            this.uploading = false;
            this.uploaded.emit();
          },
          error: err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Upload failed',
              detail: typeof err === 'string' ? err : 'Please try again.',
            });
            this.uploading = false;
          },
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Could not read the selected file.' });
        this.uploading = false;
      },
    });
  }

  private resetForm(): void {
    this.documentName = this.file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
    this.description = '';
    this.categoryType = 'Meeting Minutes';
    this.meetingYear = String(new Date().getFullYear());
    this.customCategory = '';
    this.uploading = false;
  }

  private resolveCategory(): string {
    if (this.categoryType === 'Meeting Minutes') {
      return `${this.meetingYear.trim()} Meeting Minutes`;
    }

    if (this.categoryType === 'Bylaws') {
      return 'Bylaws';
    }

    return this.customCategory.trim();
  }

  private convertFile(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        observer.next(btoa(reader.result?.toString() ?? ''));
        observer.complete();
      };
      reader.onerror = () => observer.error(reader.error);
      reader.readAsBinaryString(file);
    });
  }
}
