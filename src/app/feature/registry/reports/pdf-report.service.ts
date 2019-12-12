import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

pdf.fonts = {
  Calibri: {
    normal: 'calibri.ttf',
    bold: 'calibrib.ttf',
    italics: 'calibrii.ttf',
    bolditalics: 'calibril.ttf'
  },
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  FontAwesome: {
    normal: 'fa-regular-400.ttf',
    bold: 'fa-solid-900.ttf',
    italics: 'fa-regular-400.ttf',
    bolditalics: 'fa-regular-400.ttf'
  }
};

@Injectable({
  providedIn: 'root'
})
export class PdfReportService {
  constructor() {}

  public downloadPdf(docDefinition: pdfMake.TDocumentDefinitions, fileName?: string) {
    pdfMake.createPdf(docDefinition).download(fileName);
  }
}
