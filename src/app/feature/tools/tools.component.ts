import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { saveAs } from 'file-saver'; // save the file
import * as converter from 'json-2-csv';

interface Model {
  hn: number;
  patient: string;
}

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolsComponent implements OnInit {
  file: File;
  fileContent = '';
  html: string;

  constructor() {}

  ngOnInit() {}

  public onFileSelected(fileList: FileList): void {
    const fileReader: FileReader = new FileReader();
    this.file = fileList[0];

    fileReader.onloadend = x => {
      this.fileContent = (fileReader.result as string)
        .replace(/[\r\n]/g, '\n')
        .replace(/[\r]/g, '\n')
        .replace(/[\n\n]/g, '\n');
      // console.log(fileReader.result);

      //#region CSV to HTML
      const lines = this.fileContent.split('\n');
      const output: string[] = [];

      /* HEADERS */
      output.push(
        '<tr><th>' +
          lines[0]
            .replace(/["]/g, '')
            .slice()
            .split(',')
            .join('</th><th>') +
          '</th></tr>'
      );

      for (let i = 1; i < lines.length; i++) {
        output.push(
          '<tr><td>' +
            lines[i]
              .slice()
              .split(',')
              .join('</td><td>') +
            '</td></tr>'
        );
      }
      this.html = '<table><tbody>' + output.join('') + '</tbody></table>';
      //#endregion
    };
    fileReader.readAsText(this.file);
  }

  download() {
    converter
      .csv2jsonAsync(this.fileContent, { delimiter: { eol: '\n' } })
      .then(json => {
        // tslint:disable: no-string-literal
        const newData = json.map((o: object) => {
          return {
            hn: o['id'],
            patient: o['name']
          };
        });
        // tslint:enable: no-string-literal
        const data = JSON.stringify(newData);
        console.log(data);

        // const fileSave = new Blob([data], { type: 'text/json;charset=utf-8' });
        // saveAs(fileSave, 'convert.json');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
