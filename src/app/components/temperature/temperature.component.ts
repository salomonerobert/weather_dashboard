import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DailyData, DailyUnits, WeatherAPIResponseData } from 'src/app/core/interfaces';
import { ChartDataService } from 'src/app/core/services/chart-data.service';
@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature.component.html',
})
export class TemperatureChartComponent implements OnInit {
  temperatureChartData: DailyData;
  temperatureUnits: DailyUnits['temperature_2m_max'];

  constructor(private chartDataService: ChartDataService) {
    this.temperatureChartData = {
      time: [],
      temperature_2m_max: [],
      temperature_2m_min: []
    };
    this.temperatureUnits = '';
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.chartDataService.chartData$.subscribe((data: WeatherAPIResponseData) => {
      if (data.daily) {
        this.temperatureChartData = data.daily;
        this.temperatureUnits = data.daily_units.temperature_2m_max;

      // Initialize your chart here, inside the subscription callback.
      const lineCanvasEle: any = document.getElementById('line_chart');
      const lineChar = new Chart(lineCanvasEle.getContext('2d'), {
        type: 'line',
        data: {
          labels: this.temperatureChartData?.time, // TODO: add typing for API response
          datasets: [
            { data: this.temperatureChartData?.temperature_2m_min, label: 'Min. Temperature', borderColor: 'rgba(54, 162, 235)', tension: 0.3 },
            { data: this.temperatureChartData?.temperature_2m_max, label: 'Max. Temperature', borderColor: 'rgb(207, 97, 89)', tension: 0.3 },
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: `Temperature (${this.temperatureUnits})`,
              }
            }
          }
        }
      });
      }
    });
  }
}
