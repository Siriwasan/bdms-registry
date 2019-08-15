import { Component, OnInit } from '@angular/core';

import * as marked from 'marked';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  changeLog = require('raw-loader!CHANGELOG.md');

  get html() {
    return marked(this.changeLog);
  }

  constructor() {}

  ngOnInit() {}
}
