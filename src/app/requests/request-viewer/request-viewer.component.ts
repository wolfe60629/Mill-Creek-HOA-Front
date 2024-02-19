import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PDFDocument} from 'pdf-lib';
import {
  FormDataType,
  NgxExtendedPdfViewerComponent,
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

  @Input() isRequest: boolean;
  @Output() isRequestChange = new EventEmitter<boolean>();

  @ViewChild('pdfViewer') pdfViewer: NgxExtendedPdfViewerComponent;


  src: SafeResourceUrl;
  pdfDocument: PDFDocument;
  b64: string;
  formData: FormDataType;
  requestName: String = '';
  requestEmail: String = '';
  private submitedForm: string;
  isOnFinalStep;
  isLoading = false;

  constructor(private sanitizer: DomSanitizer,
              private ngxService: NgxExtendedPdfViewerService,
              private documentsService: DocumentsService,
              private emailService: EmailService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {

    pdfDefaultOptions.enableScripting = false;
    pdfDefaultOptions.renderForms = true;
    //pdfDefaultOptions.renderInteractiveForms = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.manifestHtml) {
      this.b64 = changes.manifestHtml.currentValue;
      PDFDocument.load(changes.manifestHtml.currentValue).then(pdf => {
        this.pdfDocument = pdf;

        pdf.saveAsBase64().then(saved => {
          this.src = this.updateSrc(saved);
        });
      });
    }

    if (changes.isRequest) {
      this.isRequest = changes.isRequest.currentValue;
    }

    if (changes.showViewerModal.currentValue === true) {
      this.requestName = '';
      this.requestEmail = '';
      this.isOnFinalStep = false;
    }
  }

  ngOnInit(): void {
    this.isOnFinalStep = false;
  }

  updateSrc(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + url + '#toolbar=0&navpanes=0');
  }

  submitDocument() {
    if (!(this.requestEmail && this.requestName)) {
      this.messageService.add({severity: 'error', summary: 'Name/Email Not Provided'});
      return;
    }

    this.confirmationService.confirm({
      header: 'Submit ARC Request?',
      message: 'Are you sure you want to continue?',
      key: 'confirm',
      accept: () => {
        this.isLoading = true;
        this.emailService.sendNewRequest( {
          friendlyName: '',
          name: '',
          description: '',
          item: this.submitedForm,
          category: ''
        }, this.requestName, this.requestEmail).subscribe(() => {
          this.isLoading = false;
          this.showViewerModalChange.emit(false);
          this.messageService.add({severity: 'success', summary: 'Request Submitted Successfully!'});
        }, (err) => {
          this.isLoading = false;
          this.messageService.add({severity: 'error', summary: err});
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
    // Limit file size to 10MB
    if (files.item(0).size > 10000000) {
      this.messageService.add({severity: 'error', summary: 'File Not Uploaded: File Size is Too Large'});
      return;
    }

    const fileToAppend = files[0];
    console.log(fileToAppend.type);

    // Handle if pdf attached
    if (fileToAppend.type === 'application/pdf') {
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
    } else if (fileToAppend.type === 'image/png') {
      const pdf1 = await PDFDocument.load(await this.ngxService.getCurrentDocumentAsBlob().then((blob: Blob) => {
        return this.blobToBase64(blob);
      }));

      const jpgImage = await pdf1.embedPng(await fileToAppend.arrayBuffer());
      const jpgDims = jpgImage.scale(0.5);
      const newPage = pdf1.addPage();

      newPage.drawImage(jpgImage, {
        x: newPage.getWidth() / 2 - jpgDims.width / 2,
        y: newPage.getHeight() / 2 - jpgDims.height / 2,
        width: jpgDims.width,
        height: jpgDims.height,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      pdf1.save();
      this.b64 = await pdf1.saveAsBase64();
    } else if (fileToAppend.type === 'image/jpeg') {
      const pdf1 = await PDFDocument.load(await this.ngxService.getCurrentDocumentAsBlob().then((blob: Blob) => {
        return this.blobToBase64(blob);
      }));

      const jpgImage = await pdf1.embedJpg(await fileToAppend.arrayBuffer());
      const jpgDims = jpgImage.scale(0.5);
      const newPage = pdf1.addPage();

      newPage.drawImage(jpgImage, {
        x: newPage.getWidth() / 2 - jpgDims.width / 2,
        y: newPage.getHeight() / 2 - jpgDims.height / 2,
        width: jpgDims.width,
        height: jpgDims.height,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      pdf1.save();
      this.b64 = await pdf1.saveAsBase64();
    } else {
      this.messageService.add({severity: 'error', summary: 'File Not Uploaded: Uploaded File is Not An Acceptable File Type'});
      return;
    }

    // Success Message
    this.messageService.add({severity: 'success', summary: 'Attachment Uploaded Successfully'});
  }

  goToFinalStep () {
    this.downloadAsBlob().then(() => {
      this.isOnFinalStep = true;
    } );
  }
}
