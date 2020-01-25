import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathPci50ChartComponent } from './cath-pci50-chart.component';

describe('CathPci50ChartComponent', () => {
  let component: CathPci50ChartComponent;
  let fixture: ComponentFixture<CathPci50ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathPci50ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathPci50ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
