import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { RegistryService } from '../../registry/registry.service';
import { RegistryModel } from '../../registry/registry.model';

@Component({
  selector: 'app-acsx290-chart',
  templateUrl: './acsx290-chart.component.html',
  styleUrls: ['./acsx290-chart.component.scss']
})
export class Acsx290ChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'CAG' }];
  public barChartColors: Color[] = [{ backgroundColor: 'rgba(143,227,209,0.8)' }];

  acsx290Data: RegistryModel[];

  constructor(private registryService: RegistryService) {}

  async ngOnInit() {
    this.acsx290Data = await this.registryService.loadAllRegistries('ACSx290');
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
      this.barChartData[0].data.push(num);
    });
  }
}
