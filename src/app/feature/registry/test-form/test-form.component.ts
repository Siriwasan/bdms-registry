import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';

import { BaseRegistryComponent } from '../../../shared/components/base-registry/base-registry.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent extends BaseRegistryComponent implements OnInit {

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement);
  }

  // ngOnInit() {
  //   super.ngOnInit();
  // }

}
