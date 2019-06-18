import {
  HostListener,
  isDevMode,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { map, first } from 'rxjs/operators';
import * as marked from 'marked';

import { BaseFormComponent } from './base-form.component';
import { DialogService } from '../../services/dialog.service';
import { ScrollSpyService } from '../../modules/scroll-spy/scroll-spy.service';

import {
  FormCondition,
  FormValidation,
  ControlCondition,
  ValidationMessage,
  SectionMember
} from './base-registry.model';
import { RegistryService } from 'src/app/feature/registry/registry.service';

export class BaseRegistryComponent extends BaseFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private formConditions: FormCondition;
  private validations: FormValidation;
  private sectionMembers: SectionMember[];

  private dataDict: string;
  private tokens: marked.TokensList;

  constructor(
    protected dialogService: DialogService,
    protected changeDetector: ChangeDetectorRef,
    protected scrollSpy: ScrollSpyService,
    protected hostElement: ElementRef,
    public registryService: RegistryService
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
    console.log('destroy2');
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
      content: 'Save before leave',
      buttons: ['Cancel', 'Discard']
    });

    return dialogRef.afterClosed().pipe(
      map(result => {
        if (result === 'Cancel') {
          return false;
        }
        if (result === 'Discard') {
          return true;
        }
      }),
      first()
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (!isDevMode()) {
      console.log('Processing beforeunload...');
      event.returnValue = false;
    }
  }
  //#endregion Warning before leaving

  public formCompletion = (section: string): string => this.registryService.formCompletion(section);
  public isShowControl = (control: string): boolean => this.registryService.isShowControl(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryService.getValidations(control);
  public isInvalid = (control: string, validationType: string): boolean => this.registryService.isInvalid(control, validationType);
}