import { CanDeactivate } from '@angular/router';

import { RegistryFormComponent } from '../modules/registry-form/registry-form.component';

export class DeactivateGuard implements CanDeactivate<RegistryFormComponent> {
  canDeactivate(component: RegistryFormComponent) {
    return component.canDeactivate();
  }
}
