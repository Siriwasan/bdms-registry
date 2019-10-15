import { RegistryFormService } from './registry-form.service';
import { ValidationMessage } from './registry-form.model';
import { FormGroup } from '@angular/forms';

export class RegistryControlComponent {
  constructor(protected registryFormService: RegistryFormService) {}

  public hasInfo = (control: string) => this.registryFormService.hasInfo(control);
  public openInfo = (control: string) => this.registryFormService.openInfo(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryFormService.getValidations(control);
  public isInvalid = (formGroup: FormGroup, control: string, validationType: string): boolean =>
    this.registryFormService.isInvalid(formGroup, control, validationType);
}
