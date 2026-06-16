import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrollRevealDirective } from '../directives/scroll-reveal.directive';

interface HeroGalleryPhoto {
  src?: string;
  alt: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-site-scroll',
  templateUrl: './site-scroll.component.html',
  styleUrls: ['./site-scroll.component.css'],
  standalone: false,
})
export class SiteScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  private scrollTimer?: ReturnType<typeof setTimeout>;

  selectedPhoto: HeroGalleryPhoto | null = null;
  showPhotoLightbox = false;

  readonly directionsUrl =
    'https://www.google.com/maps/search/?api=1&query=118+Mill+Creek+Drive+Ball+Ground+GA';

  readonly heroGallery: HeroGalleryPhoto[] = [
    {
      src: 'assets/hero-community-pool.png',
      alt: 'Community swimming pool with lounge chairs and pool house',
      label: 'Community Pool',
      icon: 'pool',
    },
    {
      src: 'assets/hero-playground.png',
      alt: 'Neighborhood playground with slides and climbing structures',
      label: 'Playground',
      icon: 'child_care',
    },
    {
      src: 'assets/hero-tennis-court.png',
      alt: 'Community tennis courts with blue surface and lighting',
      label: 'Tennis Courts',
      icon: 'sports_tennis',
    },
    {
      src: 'assets/hero-park.png',
      alt: 'Park area with swings and open green space',
      label: 'Park & Play',
      icon: 'park',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onGalleryImageError(photo: HeroGalleryPhoto): void {
    photo.src = undefined;
  }

  openPhotoLightbox(photo: HeroGalleryPhoto): void {
    if (!photo.src) {
      return;
    }

    this.selectedPhoto = photo;
    this.showPhotoLightbox = true;
    document.body.style.overflow = 'hidden';
  }

  closePhotoLightbox(): void {
    this.showPhotoLightbox = false;
    this.selectedPhoto = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showPhotoLightbox) {
      this.closePhotoLightbox();
    }
  }
  ngAfterViewInit(): void {
    const sectionFromRoute = this.route.snapshot.data['section'] as string | undefined;

    if (sectionFromRoute && sectionFromRoute !== 'top') {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        const target = document.getElementById(sectionFromRoute);
        target?.scrollIntoView({ behavior: 'auto', block: 'start' });
        ScrollRevealDirective.refreshAll();
      }, 120);
    }

    setTimeout(() => ScrollRevealDirective.refreshAll(), 300);
  }

  ngOnDestroy(): void {
    clearTimeout(this.scrollTimer);
    document.body.style.overflow = '';
  }
}
