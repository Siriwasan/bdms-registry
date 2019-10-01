import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title$: Observable<string>;
  user$: Observable<User>;

  color = 'primary';
  title = 'BDMS Registry';

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.title$ = this.store.select(fromRoot.getTitle);
    this.user$ = this.store.select(fromRoot.getUser);

    const url = window.location.href;
    if (url.includes('bdms-registry-dev')) {
      this.color = 'accent';
      this.title = 'BDMS Registry - DEV';
    }
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
