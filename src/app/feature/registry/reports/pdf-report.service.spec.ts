import { TestBed } from '@angular/core/testing';

import { PdfReportService } from './pdf-report.service';

describe('PdfReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfReportService = TestBed.get(PdfReportService);
    expect(service).toBeTruthy();
  });
});
