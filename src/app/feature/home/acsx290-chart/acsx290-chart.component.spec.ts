import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Acsx290ChartComponent } from './acsx290-chart.component';

describe('Acsx290ChartComponent', () => {
  let component: Acsx290ChartComponent;
  let fixture: ComponentFixture<Acsx290ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Acsx290ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Acsx290ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
