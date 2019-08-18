import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

import { User } from '../auth/user.model';
import * as Auth from '../auth/auth.data';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() navMode: string;
  @Output() closeSidenav = new EventEmitter<void>();

  user$: Observable<User>;
  authMenu = Auth.menus;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromRoot.getUser);
  }

  onClose() {
    if (this.navMode === 'over') {
      this.closeSidenav.emit();
    }
  }
}
