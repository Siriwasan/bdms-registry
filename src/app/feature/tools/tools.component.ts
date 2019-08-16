import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { saveAs } from 'file-saver'; // save the file
import * as converter from 'json-2-csv';
import { ToolsService } from './tools.service';
import { FileService } from 'src/app/shared/services/file.service';
import { Registry } from '../registry/registry.model';
import { Staff } from '../staff/staff.model';
import { ACSx290Form } from '../registry/acsx290/acsx290.model';

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

  constructor(private toolsService: ToolsService, private fileService: FileService) {}

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

  async exportStaff() {
    const data = await this.toolsService.loadStaffs();
    this.fileService.saveJSONtoFile(data, 'staff.json');
    console.log('export staff ' + data.length + ' records');
  }

  async exportRegistry() {
    const data = await this.toolsService.loadRegistries();
    this.fileService.saveJSONtoFile(data, 'registry.json');
    console.log('export registry ' + data.length + ' records');
  }

  async exportACSx290() {
    const data = await this.toolsService.loadACSx290s();
    this.fileService.saveJSONtoFile(data, 'acsx290.json');
    console.log('export ACSx290 ' + data.length + ' records');
  }

  importStaff(fileList: FileList) {
    const fileReader: FileReader = new FileReader();
    this.file = fileList[0];

    console.log('import staff');
    fileReader.readAsText(this.file);
    fileReader.onloadend = async x => {
      console.log('load staff completed');
      const staffs = JSON.parse(fileReader.result as string) as Staff[];
      await this.toolsService.dumpStaffs(staffs);
      console.log('dump staff completed ' + staffs.length + ' records');
    };
  }

  importRegistry(fileList: FileList) {
    const fileReader: FileReader = new FileReader();
    this.file = fileList[0];

    console.log('import registry');
    fileReader.readAsText(this.file);
    fileReader.onloadend = async x => {
      console.log('load registry completed');
      const registries = JSON.parse(fileReader.result as string) as Registry[];
      await this.toolsService.dumpRegistries(registries);
      console.log('dump registry completed ' + registries.length + ' records');
    };
  }

  importACSx290(fileList: FileList) {
    const fileReader: FileReader = new FileReader();
    this.file = fileList[0];

    console.log('import ACSx290');
    fileReader.readAsText(this.file);
    fileReader.onloadend = async x => {
      console.log('load ACSx290 completed');
      const acsxs = JSON.parse(fileReader.result as string) as ACSx290Form[];
      await this.toolsService.dumpACSx290s(acsxs);
      console.log('dump ACSx290 completed ' + acsxs.length + ' records');
    };
  }
}
