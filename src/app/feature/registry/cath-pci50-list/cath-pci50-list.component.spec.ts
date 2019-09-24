import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathPci50ListComponent } from './cath-pci50-list.component';

describe('CathPci50ListComponent', () => {
  let component: CathPci50ListComponent;
  let fixture: ComponentFixture<CathPci50ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathPci50ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathPci50ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
