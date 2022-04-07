import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PDFDocument} from 'pdf-lib';
import {
  FormDataType,
  NgxExtendedPdfViewerComponent,
  NgxExtendedPdfViewerServerComponent,
  NgxExtendedPdfViewerService,
  pdfDefaultOptions
} from 'ngx-extended-pdf-viewer';
import {DocumentsService} from '../../services/documents.service';
import {Doc} from '../../types/document';
import {EmailService} from '../../services/email.service';
import {ConfirmationService, MessageService} from 'primeng/api';


@Component({
  selector: 'app-request-viewer',
  templateUrl: './request-viewer.component.html',
  styleUrls: ['./request-viewer.component.css']
})
export class RequestViewerComponent implements OnInit, OnChanges {

  @Input() showViewerModal: boolean = false;
  @Output() showViewerModalChange = new EventEmitter<boolean>();

  @Input() manifestHtml: String;
  @Output() manifestHtmlChange = new EventEmitter<String>();

  @ViewChild('pdfViewer') pdfViewer: NgxExtendedPdfViewerComponent;


  src: SafeResourceUrl;
  pdfDocument: PDFDocument;
  b64: string;
  formData: FormDataType;
  private submitedForm: string;

  constructor(private sanitizer: DomSanitizer,
              private ngxService: NgxExtendedPdfViewerService,
              private documentsService: DocumentsService,
              private emailService: EmailService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {

    pdfDefaultOptions.enableScripting = false;
    pdfDefaultOptions.renderForms = true;
    pdfDefaultOptions.renderInteractiveForms = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes.manifestHtml) {
      this.b64 = changes.manifestHtml.currentValue;
      PDFDocument.load(changes.manifestHtml.currentValue).then(pdf => {
        this.pdfDocument = pdf;

        pdf.saveAsBase64().then(saved => {
          this.src = this.updateSrc(saved);
        });
      });
    }

  }

  ngOnInit(): void {
  }

  updateSrc(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + url + '#toolbar=0&navpanes=0');
  }

  submitDocument() {

    this.confirmationService.confirm({
      header: 'Ready to submit?',
      key: 'confirm',
      accept: () => {
        this.downloadAsBlob().then(() => {
        this.emailService.sendNewRequest( {
          friendlyName: '',
          name: '',
          description: '',
          item: this.submitedForm,
          category: ''
        });
      }).then( () => {
        this.showViewerModalChange.emit(false);
          this.messageService.add({severity: 'success', summary: 'Request Submitted Successfully!'});
      });
      }
    });

  }

  dataChange(changes: FormDataType) {
  }

  public async downloadAsBlob(): Promise<void> {
    const blob = await this.ngxService.getCurrentDocumentAsBlob();
    if (blob) {
     await this.blobToBase64(blob).then((text: string) => {
       this.submitedForm = text.split(',')[1];
     });
    }
  }

   blobToBase64(blob): Promise<string> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.toString());
      reader.readAsDataURL(blob);
    });
  }

  async handleFileInput(files: FileList) {
    // Limit file size to 5MB
    if (files.item(0).size > 5000000) {
      return;
    }

    const fileToAppend = files[0];


    // Load a PDFDocument from each of the existing PDFs
    const pdf1 = await PDFDocument.load(await this.ngxService.getCurrentDocumentAsBlob().then((blob: Blob) => {
     return this.blobToBase64(blob);
    }));
    const pdf2 = await fileToAppend.arrayBuffer().then(buffer => {
      return PDFDocument.load(buffer);
    });

    // Create a new PDFDocument
    const mergedPdf = await PDFDocument.create();

    const copiedPagesA = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page));

    const copiedPagesB = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page));

    await mergedPdf.save();

    this.b64 = await mergedPdf.saveAsBase64();
  }
}
