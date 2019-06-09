import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';

import { BaseRegistryComponent } from '../../../shared/components/base-registry/base-registry.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';

@Component({
  selector: 'app-acsx290',
  templateUrl: './acsx290.component.html',
  styleUrls: ['./acsx290.component.scss']
})
export class ACSx290Component extends BaseRegistryComponent implements OnInit {
  tocMaxHeight: string;
  private tocMaxHeightOffset = 0;

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    private hostElement: ElementRef
  ) {
    super(dialogService, changeDetector, scrollSpy);
  }

  ngOnInit() {
    document.querySelector('mat-sidenav-content').addEventListener('scroll', () => {
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
}
