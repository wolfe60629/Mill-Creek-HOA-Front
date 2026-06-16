import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: false,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() scrollRevealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal');

    if (this.scrollRevealDelay > 0) {
      element.style.setProperty('--scroll-reveal-delay', `${this.scrollRevealDelay}ms`);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          this.reveal(element);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );

    this.observer.observe(element);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollRevealDirective.revealIfInView(element));
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  static refreshAll(): void {
    document.querySelectorAll<HTMLElement>('.scroll-reveal:not(.is-visible)').forEach(element => {
      ScrollRevealDirective.revealIfInView(element);
    });
  }

  static revealIfInView(element: HTMLElement): void {
    if (element.classList.contains('is-visible')) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;

    if (inView) {
      element.classList.add('is-visible');
    }
  }

  private reveal(element: HTMLElement): void {
    element.classList.add('is-visible');
    this.observer?.unobserve(element);
  }
}
