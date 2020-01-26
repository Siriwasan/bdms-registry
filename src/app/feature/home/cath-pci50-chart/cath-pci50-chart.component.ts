import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { RegistryService } from '../../registry/registry.service';
import { RegistryModel } from '../../registry/registry.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-cath-pci50-chart',
  templateUrl: './cath-pci50-chart.component.html',
  styleUrls: ['./cath-pci50-chart.component.scss']
})
export class CathPci50ChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'CAG', stack: 'a' },
    { data: [], label: 'CAG + PCI', stack: 'a' }
  ];

  cathPci50Data: RegistryModel[];

  constructor(private registryService: RegistryService, private ngxService: NgxUiLoaderService) {}

  async ngOnInit() {
    this.ngxService.startLoader('loader-02');
    this.cathPci50Data = await this.registryService.loadAllRegistries('CathPci50');
    this.ngxService.stopLoader('loader-02');

    // console.log(this.cathPci50Data);
    const group = this.cathPci50Data.reduce((r, a) => {
      // console.log("a", a);
      // console.log('r', r);
      r[a.hospitalId] = [...(r[a.hospitalId] || []), a];
      return r;
    }, {});
    // console.log(group);

    Object.entries(group).find(([key, value]) => {
      // console.log(key, value);
      this.barChartLabels.push(key);
      const pciNumber = (value as RegistryModel[]).filter(a => a.tags.includes('PCI')).length;
      const cagNumber =
        (value as RegistryModel[]).filter(a => a.tags.includes('CAG')).length - pciNumber;
      this.barChartData[0].data.push(cagNumber);
      this.barChartData[1].data.push(pciNumber);
    });
  }
}
