import {Component, EventEmitter, Injectable, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import {NgModel} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css'],
    standalone: false
})
export class ViewerComponent implements OnInit, OnChanges {
  @Input() showViewerModal: boolean = false;
  @Output() showViewerModalChange = new EventEmitter<boolean>();

  @Input() manifestHtml: String;
  @Output() manifestHtmlChange = new EventEmitter<String>();

  src: SafeResourceUrl;
  isLoading: boolean = true; // Manage loading state
  zoom: string = '100%'; // Initialize zoom property

  private resizeHandler = () => this.setAdaptiveZoom();

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.manifestHtml) {
      this.isLoading = true; // Start loading when manifestHtml changes
      this.src = changes.manifestHtml.currentValue;
      console.log('PDF Source Updated:', this.src); // Debugging log
      this.cdr.detectChanges(); // Trigger change detection
      setTimeout(() => this.isLoading = false, 1000); // Simulate loading delay
    }

    if (changes.showViewerModal) {
      this.showViewerModal = changes.showViewerModal.currentValue;
    }
  }

  ngOnInit(): void {
    this.setAdaptiveZoom();
    window.addEventListener('resize', this.resizeHandler);
  }

  private setAdaptiveZoom(): void {
    const w = window.innerWidth;
    if (w < 480) {
      this.zoom = 'page-fit'; // let viewer fit width
    } else if (w < 900) {
      this.zoom = '125%';
    } else {
      this.zoom = '100%';
    }
  }

  closeViewer(): void {
    this.showViewerModal = false;
    this.showViewerModalChange.emit(false);
  }

  toggleFullScreen(): void {
    const elem = document.getElementById('pdfViewerShell');
    if (elem) {
      if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  }
}
