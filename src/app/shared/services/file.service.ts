import { Injectable } from '@angular/core';

// import * as json2csv from 'json2csv'; // convert json file to csv
import { saveAs } from 'file-saver'; // save the file
import * as converter from 'json-2-csv';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  // Json2csvParser = json2csv.Parser;

  constructor() {}

  // ! Json2CSV
  // public downloadFile(data: any, filename?: string) {
  //   const csvData = this.convertToCSV(data);
  //   const file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  //   saveAs(file, 'data.csv');
  // }

  // public convertToCSV(objArray: any, fields?) {
  //   const json2csvParser = new this.Json2csvParser({ opts: fields, flatten: true });
  //   const csv = json2csvParser.parse(objArray);
  //   console.log(csv);
  //   return csv;
  // }

  // ! Json-2-csv
  public saveJSONtoCSV(data: object[], filename: string = 'data.csv') {
    return converter
      .json2csvAsync(data, { expandArrayObjects: true })
      .then(csv => {
        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(file, filename);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public saveJSONtoFile(data: object[], filename: string = 'data.json') {
    const json = JSON.stringify(data);
    const file = new Blob([json], { type: 'text/json;charset=utf-8' });
    saveAs(file, filename);
  }

  // private dyanmicDownloadByHtmlTag(arg: { fileName: string; text: string }) {
  //   if (!this.setting.element.dynamicDownload) {
  //     this.setting.element.dynamicDownload = document.createElement('a');
  //   }
  //   const element = this.setting.element.dynamicDownload;
  //   const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
  //   element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
  //   element.setAttribute('download', arg.fileName);

  //   const event = new MouseEvent('click');
  //   element.dispatchEvent(event);
  // }
}
