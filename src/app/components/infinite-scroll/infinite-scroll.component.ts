// taked:
// https://medium.com/fafnur/%D0%B1%D0%B5%D1%81%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D1%8B%D0%B9-%D1%81%D0%BA%D1%80%D0%BE%D0%BB%D0%BB-%D0%B2-angular-9-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-intersection-observer-api-5b46c5ad9996
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

/**
 * Infinite scroll options
 */
export interface InfiniteScrollOptions {
  [key: string]: any;

  root: any;
}

@Component({
  selector: 'ms-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  /**
   * Infinite scroll options
   */
  @Input() options: Partial<InfiniteScrollOptions> = {};

  /**
   * Event emitter scrolled
   */
  @Output() scrolled = new EventEmitter<void>();

  /**
   * Bottom anchor for emit scroll
   */
  @ViewChild('anchor') anchor: ElementRef<HTMLElement> | undefined;

  /**
   * Intersection observer
   */
  private observer!: IntersectionObserver;

  constructor(
    private host: ElementRef,
    /* tslint:disable-next-line:ban-types */
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer.disconnect();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(([entry]) => entry.isIntersecting && this.scrolled.emit(), {
        root: this.isHostScrollable() ? this.host.nativeElement : null,
        ...this.options
      });
      if (this.anchor){
        this.observer.observe(this.anchor.nativeElement);
      }
    }
  }

  /**
   * Is host scrollable
   */
  private isHostScrollable(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const style = window.getComputedStyle(this.host.nativeElement);

      return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
    }

    return false;
  }
}