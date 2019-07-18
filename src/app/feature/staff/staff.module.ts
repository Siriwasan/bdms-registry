import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffService } from './staff.service';

@NgModule({
  declarations: [StaffComponent, StaffProfileComponent],
  imports: [SharedModule, StaffRoutingModule],
  providers: [StaffService]
})
export class StaffModule {}
