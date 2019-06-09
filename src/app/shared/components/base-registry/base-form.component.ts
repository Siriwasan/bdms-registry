import { AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';

export class BaseFormComponent implements AfterViewInit {
  public currentSection = '';

  constructor(protected changeDetector: ChangeDetectorRef, protected scrollSpy: ScrollSpyService) {}

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
