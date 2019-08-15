import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent, AuthComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule],
  exports: [BrowserModule, BrowserAnimationsModule, HeaderComponent, SidenavListComponent]
})
export class CoreModule {}
