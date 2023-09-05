import { Component, OnInit } from '@angular/core';
import { Chart, Tick, registerables } from 'chart.js';
import { ChartDataService } from 'src/app/core/services/chart-data.service';

@Component({
  selector: 'ap-consolidated-chart',
  templateUrl: './consolidated-charts.component.html',
})
export class ConsolidatedChartsComponent {
  constructor() {}
}
