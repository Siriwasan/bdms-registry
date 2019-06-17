import { AfterViewInit, ChangeDetectorRef, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';

import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';
import { Subscription } from 'rxjs';

export class BaseFormComponent implements OnInit, AfterViewInit, OnDestroy {
  public currentSection = '';
  public tocMaxHeight: string;
  private tocMaxHeightOffset = 0;

  private listener: any;
  private scrollTarget: any;
  private currentSectionSubscription: Subscription;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {}

  ngOnInit() {
    // adjust top offset if in mat-sidenav-content
    this.scrollTarget = document.querySelector('mat-sidenav-content');
    if (this.scrollTarget === null) {
      this.scrollTarget = window;
    }

    this.listener = () => this.calculatTocMaxHeight();
    this.scrollTarget.addEventListener('scroll', this.listener, false);
  }

  ngAfterViewInit(): void {
    this.subsribeScrollSpy();
  }

  private subsribeScrollSpy(): void {
    this.currentSectionSubscription = this.scrollSpy.getCurrentSection$().subscribe(
      (currentSection: string): void => {
        this.currentSection = currentSection;
        this.changeDetector.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    if (this.scrollTarget !== undefined) {
      this.scrollTarget.removeEventListener('scroll', this.listener, false);
    } else {
      console.log('BaseFormComponent: ngOnInit() is not initialized');
    }
    this.currentSectionSubscription.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatTocMaxHeight();

    if (this.currentSection !== '') {
      document.getElementById(this.currentSection + 'TOC').scrollIntoView({ block: 'nearest' });
    }
  }

  calculatTocMaxHeight() {
    if (!this.tocMaxHeightOffset) {
      // Must wait until `mat-toolbar` is measurable.
      const el = this.hostElement.nativeElement as Element;
      const headerEl = document.querySelector('.app-header');
      // const footerEl = el.querySelector('footer');
      // if (headerEl && footerEl) {
      //   this.tocMaxHeightOffset = headerEl.clientHeight + footerEl.clientHeight + 24; //  fudge margin
      // }
      this.tocMaxHeightOffset = headerEl.clientHeight;
    }
    this.tocMaxHeight = (document.body.scrollHeight - window.pageYOffset - this.tocMaxHeightOffset).toFixed(2);
  }

  public isActive(section: string): boolean {
    return this.currentSection === section;
  }

  public scrollTo(section: string) {
    this.scrollSpy.scrollTo(section);
  }
}
