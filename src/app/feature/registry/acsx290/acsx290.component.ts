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
  // tocMaxHeight: string;
  // private tocMaxHeightOffset = 0;

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
