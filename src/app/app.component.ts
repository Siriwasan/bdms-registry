import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterEvent,
  RouteConfigLoadStart,
  RouteConfigLoadEnd
} from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import * as UI from './shared/ui.actions';
import { AuthService } from './core/auth/auth.service';

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

  constructor(
    media: MediaObserver,
    private store: Store<fromRoot.State>,
    private router: Router,
    private authService: AuthService
  ) {
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

    this.router.events.subscribe(
      (event: RouterEvent): void => {
        switch (true) {
          case event instanceof RouteConfigLoadStart:
            // console.log('RouteConfigLoadStart');
            break;

          case event instanceof NavigationStart:
            // console.log('NavigationStart');
            // this.store.dispatch(new UI.StartLoading());
            break;

          case event instanceof RouteConfigLoadEnd:
            // console.log('RouteConfigLoadEnd');
            break;

          case event instanceof NavigationEnd:
            // console.log('NavigationEnd');
            // this.store.dispatch(new UI.StopLoading());

            // setTimeout(() => {
            // this.store.dispatch(new UI.StopLoading());
            // }, 2000);
            break;

          case event instanceof NavigationCancel:
            // console.log('NavigationCancel');
            // this.store.dispatch(new UI.StopLoading());
            break;

          case event instanceof NavigationError:
            // console.log('NavigationError');
            break;
        }
      }
    );
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.authService.autoLogin();
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
