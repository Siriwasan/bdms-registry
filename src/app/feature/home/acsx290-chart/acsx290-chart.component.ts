import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

import { RegistryService } from '../../registry/registry.service';
import { RegistryModel } from '../../registry/registry.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-acsx290-chart',
  templateUrl: './acsx290-chart.component.html',
  styleUrls: ['./acsx290-chart.component.scss'],
})
export class Acsx290ChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: '2019' },
    { data: [], label: '2020' },
    { data: [], label: '2021' },
  ];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgba(143, 227, 209, 0.8)' },
    { backgroundColor: 'rgba(139, 145, 242, 0.8)' },
    { backgroundColor: 'rgba(255, 110, 97, 0.8)' },
  ];

  acsx290Data: RegistryModel[];

  constructor(private registryService: RegistryService, private ngxService: NgxUiLoaderService) {}

  async ngOnInit() {
    this.ngxService.startLoader('loader-01');
    this.acsx290Data = await this.registryService.loadAllRegistries('ACSx290');
    this.ngxService.stopLoader('loader-01');

    // console.log(this.cathPci50Data);
    const group = this.acsx290Data.reduce((r, a) => {
      // console.log("a", a);
      // console.log('r', r);
      r[a.hospitalId] = [...(r[a.hospitalId] || []), a];
      return r;
    }, {});
    // console.log(group);

    Object.entries(group).find(([key, value]) => {
      // console.log(key, value);
      this.barChartLabels.push(key);
      const num = (value as RegistryModel[]).length;
      const registry = value as RegistryModel[];
      const y2019 = registry.filter((a) => moment(a.procedureDateTime).year() === 2019).length;
      const y2020 = registry.filter((a) => moment(a.procedureDateTime).year() === 2020).length;
      const y2021 = registry.filter((a) => moment(a.procedureDateTime).year() === 2021).length;
      this.barChartData[0].data.push(y2019);
      this.barChartData[1].data.push(y2020);
      this.barChartData[2].data.push(y2021);
    });
  }
}
