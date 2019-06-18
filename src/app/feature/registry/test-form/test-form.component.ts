import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';

import { RegistryFormComponent } from '../../../shared/components/registry/registry-form.component';
import { DialogService } from '../../../shared/services/dialog.service';
import { ScrollSpyService } from '../../../shared/modules/scroll-spy/scroll-spy.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent extends RegistryFormComponent implements OnInit {

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef
  ) {
    super(dialogService, changeDetector, scrollSpy, hostElement, null);
  }

  // ngOnInit() {
  //   super.ngOnInit();
  // }

}
