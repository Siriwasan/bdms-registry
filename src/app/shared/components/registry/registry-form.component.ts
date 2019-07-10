import {
  HostListener,
  isDevMode,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { map, first } from 'rxjs/operators';

import { ScrollSpyFormComponent } from './scrollspy-form.component';
import { DialogService } from '../../services/dialog.service';
import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';

import { ValidationMessage } from '../../../feature/registry/registry.model';
import { RegistryService } from '../../../feature/registry/registry.service';

export class RegistryFormComponent extends ScrollSpyFormComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    protected registryService: RegistryService
  ) {
    super(changeDetector, scrollSpy, hostElement);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    // console.log('[BaseRegistryComponent]: destroy');
  }

  //#region Warning before leaving
  public canDeactivate() {
    // ? Prototype for leaving form after changed
    // ? return confirm('Do you really want to leave?');
    // ? return this.form.submitted || !this.form.dirty;

    if (!this.registryService.isFormDirty()) {
      return true;
    }

    const dialogRef = this.dialogService.createModalDialog({
      title: 'Warning!!!',
      content: 'Form is not saved before leaving',
      buttons: ['Save', 'Discard change', 'Cancel']
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        if (result === 'Save') {
          return true;
        }
        if (result === 'Discard change') {
          return true;
        }
        if (result === 'Cancel') {
          return false;
        }
      }),
      first()
    );
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   if (!isDevMode()) {
  //     console.log('Processing beforeunload...');
  //     event.returnValue = false;
  //   }
  // }
  //#endregion Warning before leaving

  // ? Composition pattern
  public formCompletion = (section: string): string => this.registryService.formCompletion(section);
  // public isShowControl = (control: string): boolean => this.registryService.isShowControl(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryService.getValidations(control);
  // public isInvalid = (control: string, validationType: string): boolean =>
  //   this.registryService.isInvalid(control, validationType);
}
