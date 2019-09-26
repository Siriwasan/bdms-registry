import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACSx290ListComponent } from './acsx290-list.component';

describe('ACSx290ListComponent', () => {
  let component: ACSx290ListComponent;
  let fixture: ComponentFixture<ACSx290ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACSx290ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACSx290ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
