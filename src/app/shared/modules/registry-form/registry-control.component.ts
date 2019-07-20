import { ValidationMessage } from '../../../feature/registry/registry.model';
import { RegistryFormService } from './registry-form.service';

export class RegistryControlComponent {
  constructor(protected registryFormService: RegistryFormService) {}

  public hasInfo = (control: string) => this.registryFormService.hasInfo(control);
  public openInfo = (control: string) => this.registryFormService.openInfo(control);
  public getValidations = (control: string): ValidationMessage[] => this.registryFormService.getValidations(control);
  public isInvalid = (control: string, validationType: string): boolean =>
    this.registryFormService.isInvalid(control, validationType);
}
