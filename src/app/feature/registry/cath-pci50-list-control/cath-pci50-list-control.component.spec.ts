import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathPci50ListControlComponent } from './cath-pci50-list-control.component';

describe('CathPci50ListControlComponent', () => {
  let component: CathPci50ListControlComponent;
  let fixture: ComponentFixture<CathPci50ListControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathPci50ListControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathPci50ListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
