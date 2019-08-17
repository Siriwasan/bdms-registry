import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotAutherizedComponent } from './page-not-autherized.component';

describe('PageNotAutherizedComponent', () => {
  let component: PageNotAutherizedComponent;
  let fixture: ComponentFixture<PageNotAutherizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotAutherizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotAutherizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
