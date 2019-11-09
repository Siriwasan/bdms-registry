import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACSx290ListControlComponent } from './acsx290-list-control.component';

describe('ACSx290ListControlComponent', () => {
  let component: ACSx290ListControlComponent;
  let fixture: ComponentFixture<ACSx290ListControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACSx290ListControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACSx290ListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
