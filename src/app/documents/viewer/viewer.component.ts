import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  standalone: false,
})
export class ViewerComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() showViewerModal = false;
  @Output() showViewerModalChange = new EventEmitter<boolean>();

  @Input() manifestHtml: string;
  @Output() manifestHtmlChange = new EventEmitter<string>();

  @Input() documentTitle = '';

  @ViewChild('pdfOverlay') pdfOverlay?: ElementRef<HTMLElement>;

  src: SafeResourceUrl;
  zoom = 'page-width';

  private resizeHandler = () => {
    this.zoom = 'page-width';
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.showViewerModal) {
      this.attachOverlayToBody();
    }
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.manifestHtml) {
      this.src = changes.manifestHtml.currentValue;
      this.cdr.detectChanges();
    }

    if (changes.showViewerModal) {
      this.showViewerModal = changes.showViewerModal.currentValue;
      document.body.style.overflow = this.showViewerModal ? 'hidden' : '';

      if (this.showViewerModal) {
        setTimeout(() => this.attachOverlayToBody());
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    document.body.style.overflow = '';

    const overlay = this.pdfOverlay?.nativeElement;
    if (overlay) {
      overlay.classList.remove('is-open');
      if (overlay.parentElement === document.body) {
        overlay.remove();
      }
    }
  }

  private attachOverlayToBody(): void {
    const overlay = this.pdfOverlay?.nativeElement;
    if (!overlay || overlay.parentElement === document.body) {
      return;
    }

    document.body.appendChild(overlay);
  }

  closeViewer(): void {
    this.showViewerModal = false;
    this.showViewerModalChange.emit(false);
    document.body.style.overflow = '';
  }
}
