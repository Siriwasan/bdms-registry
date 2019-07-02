import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  navOpened = true;
  navOver = 'side';
  watcher: Subscription;

  constructor(media: MediaObserver, private store: Store<fromRoot.State>) {
    this.watcher = media.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias === 'lg' || change[0].mqAlias === 'xl') {
        this.navOpened = true;
        this.navOver = 'side';
        document.getElementById('sidenav-content').style.marginLeft = '200px'; // sidenav-width
      } else {
        this.navOpened = false;
        this.navOver = 'over';
        document.getElementById('sidenav-content').style.marginLeft = '0px';
      }
    });
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  // Dynamically change height of table of contents container
  @HostListener('window:scroll')
  onScroll() {
    console.log('scroll');
    // if (!this.tocMaxHeightOffset) {
    //   // Must wait until `mat-toolbar` is measurable.
    //   const el = this.hostElement.nativeElement as Element;
    //   const headerEl = el.querySelector('.app-toolbar');
    //   const footerEl = el.querySelector('footer');

    //   if (headerEl && footerEl) {
    //     this.tocMaxHeightOffset = headerEl.clientHeight + footerEl.clientHeight + 24; //  fudge margin
    //   }
    // }

    // this.tocMaxHeight = (document.body.scrollHeight - window.pageYOffset - this.tocMaxHeightOffset).toFixed(2);
  }
}
