import { Component, OnInit } from '@angular/core';
import { ChartDataService } from './core/services/chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.chartDataService.fetchData().subscribe({
      next: data => {
        if (data.hourly_units) this.chartDataService.updateChartData(data);
      },
      error: error => {
        console.error(`Error fetching chart data: ${error}`)
      }
    })
  }
}
