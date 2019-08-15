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

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.title$ = this.store.select(fromRoot.getTitle);
    this.user$ = this.store.select(fromRoot.getUser);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
