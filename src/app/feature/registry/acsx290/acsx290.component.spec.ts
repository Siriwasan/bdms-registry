import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACSx290Component } from './acsx290.component';

describe('ACSx290Component', () => {
  let component: ACSx290Component;
  let fixture: ComponentFixture<ACSx290Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACSx290Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACSx290Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
