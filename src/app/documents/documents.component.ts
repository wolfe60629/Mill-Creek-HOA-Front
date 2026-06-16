import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Doc} from '../types/document';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LoginService} from '../services/login.service';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css'],
    providers: [DocumentsService],
    standalone: false
})
export class DocumentsComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  isAdmin: boolean;
  documents: Doc[] = [];
  listOfCategories: string[] = [];
  expandedCategory: string | null = null;
  fileToUpload: File | null = null;
  mainfestHtml: string;
  viewerDocumentTitle = '';
  isTryingToDelete = false;
  editingDocumentId: number | null = null;
  editFriendlyName = '';
  editDescription = '';

  showUploadModal = false;
  showViewerModal = false;

  readonly documentEditingEnabled = environment.features.documentEditing;

  constructor(private documentsService: DocumentsService,
              private sanitizer: DomSanitizer,
              private messageService: MessageService,
              private loginService: LoginService,
              private confirmationService: ConfirmationService) {}

  public ngOnInit() {
    this.loginService.checkAuthToken();

    this.documentsService.getAllDocuments().subscribe({
      next: (result: Doc[]) => {
        this.documents = result ?? [];
        this.listOfCategories = [...new Set(this.documents.map(item => item.category))];
        this.setDefaultExpandedCategory();
        setTimeout(() => ScrollRevealDirective.refreshAll(), 50);
      },
      error: () => {
        this.documents = [];
        this.listOfCategories = [];
      },
    });

    this.isAdmin = this.loginService.getAuthorizationHeaderValue().length > 0;
  }

  handleFileInput(files: FileList | null) {
    const file = files?.item(0);
    if (!file) {
      return;
    }

    if (file.size > 5000000) {
      this.messageService.add({
        severity: 'warn',
        summary: 'File too large',
        detail: 'Maximum upload size is 5 MB.',
      });
      this.resetFileInput();
      return;
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'PDF only',
        detail: 'Please choose a PDF file.',
      });
      this.resetFileInput();
      return;
    }

    this.fileToUpload = file;
    this.showUploadModal = true;
  }

  onDocumentUploaded(): void {
    this.closeUploadModal();
    this.reloadDocuments();
  }

  startEdit(document: Doc): void {
    if (!this.documentEditingEnabled || !document.id) {
      return;
    }

    this.editingDocumentId = document.id;
    this.editFriendlyName = document.friendlyName ?? '';
    this.editDescription = document.description ?? '';
  }

  cancelEdit(): void {
    this.editingDocumentId = null;
    this.editFriendlyName = '';
    this.editDescription = '';
  }

  isEditing(document: Doc): boolean {
    return this.editingDocumentId === document.id;
  }

  saveEdit(document: Doc): void {
    if (!this.editFriendlyName.trim() || !this.editDescription.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Document name and description are required.',
      });
      return;
    }

    const payload: Doc = {
      ...document,
      friendlyName: this.editFriendlyName.trim(),
      description: this.editDescription.trim(),
    };

    this.documentsService.updateDocument(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Document updated.' });
        this.cancelEdit();
        this.reloadDocuments();
      },
      error: err => {
        const detail = typeof err === 'string' && err.includes('404')
          ? 'The server does not support document updates yet. Deploy the latest backend release.'
          : (typeof err === 'string' ? err : 'Please try again.');
        this.messageService.add({ severity: 'error', summary: 'Failed to update document.', detail });
      },
    });
  }

  onEditClick(event: Event, document: Doc): void {
    event.stopPropagation();
    this.startEdit(document);
  }

  closeUploadModal(): void {
    this.showUploadModal = false;
    this.fileToUpload = null;
    this.resetFileInput();
  }

  private resetFileInput(): void {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  showFile(id: number) {
    if (!this.isTryingToDelete && !this.editingDocumentId && id) {
      const docMeta = this.documents.find(d => d.id === id);
      this.viewerDocumentTitle = docMeta?.friendlyName ?? 'Document';

      this.documentsService.getDocumentById(id).subscribe((document: Doc) => {
        this.mainfestHtml = document.item;
      });

      this.showViewerModal = true;
    }
  }

  documentsForCategory(category: string): Doc[] {
    return this.documents.filter(document => document.category === category);
  }

  isCategoryExpanded(category: string): boolean {
    return this.expandedCategory === category;
  }

  toggleCategory(category: string): void {
    this.expandedCategory = this.expandedCategory === category ? null : category;
    setTimeout(() => ScrollRevealDirective.refreshAll(), 50);
  }

  private setDefaultExpandedCategory(): void {
    const preferred = this.listOfCategories.find(category => {
      const normalized = category.trim().toLowerCase();
      return normalized === 'community information' || normalized.includes('community information');
    });

    this.expandedCategory = preferred ?? this.listOfCategories[0] ?? null;
  }

  onDeleteClick(event: Event, doc: Doc): void {
    event.stopPropagation();
    this.onDelete(doc);
  }

  onDelete(doc: Doc) {
    this.isTryingToDelete = true;
    this.confirmationService.confirm({
      header: 'Are you sure you want to delete?',
      key: 'confirm',
      accept: () => {
        this.showViewerModal = false;
        this.cancelEdit();
        this.documentsService.deleteDocument(doc).subscribe(() => {
              this.messageService.add({severity: 'success', summary: 'Document Deleted Successfully!'});
              this.reloadDocuments();
            }
        , (err) => {
              this.messageService.add({severity: 'error', summary: err});
            });
        this.isTryingToDelete  = false;
      },
      reject: () => {
        this.isTryingToDelete = false;
      }
    });
  }

  private reloadDocuments(): void {
    this.documentsService.getAllDocuments().subscribe({
      next: (result: Doc[]) => {
        this.documents = result ?? [];
        this.listOfCategories = [...new Set(this.documents.map(item => item.category))];
        this.setDefaultExpandedCategory();
        setTimeout(() => ScrollRevealDirective.refreshAll(), 50);
      },
    });
  }
}
