import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathPci50Component } from './cath-pci50.component';

describe('CathPci50Component', () => {
  let component: CathPci50Component;
  let fixture: ComponentFixture<CathPci50Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathPci50Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathPci50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
