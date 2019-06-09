import { AfterViewInit, ChangeDetectorRef, OnInit, ElementRef } from '@angular/core';

import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';

export class BaseFormComponent implements OnInit, AfterViewInit {
  public currentSection = '';
  public tocMaxHeight: string;
  private tocMaxHeightOffset = 0;

  constructor(
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {}

  ngOnInit() {
    // adjust top offset if in mat-sidenav-content
    let target: any;
    target = document.querySelector('mat-sidenav-content');
    if (target === null) {
      target = window;
    }

    target.addEventListener('scroll', () => {
      this.calculatTocMaxHeight();
    });

    window.addEventListener('resize', () => {
      this.calculatTocMaxHeight();

      if (this.currentSection !== '') {
        document.getElementById(this.currentSection + 'TOC').scrollIntoView();
      }
    });
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

  ngAfterViewInit(): void {
    this.subsribeScrollSpy();
  }

  private subsribeScrollSpy(): void {
    this.scrollSpy.getCurrentSection$().subscribe(
      (currentSection: string): void => {
        this.currentSection = currentSection;
        this.changeDetector.markForCheck();
      }
    );
  }

  public isActive(section: string): boolean {
    return this.currentSection === section;
  }

  public scrollTo(section: string) {
    this.scrollSpy.scrollTo(document, section);
  }
}
