import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HourlyData, HourlyUnits, WeatherAPIResponseData } from 'src/app/core/interfaces';
import { ChartDataService } from 'src/app/core/services/chart-data.service';

@Component({
  selector: 'app-relative-humidity-chart',
  templateUrl: './relative-humidity.component.html',
})
export class RelativeHumidityChartComponent {
  relativeHumidityChartData: HourlyData;
  relativeHumidityUnits: HourlyUnits['relativehumidity_2m'];

  constructor(private chartDataService: ChartDataService) {
    this.relativeHumidityChartData = {
      time: [],
      relativehumidity_2m: [],
      direct_radiation: []
    };
    this.relativeHumidityUnits = '';
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartDataService.chartData$.subscribe((data: WeatherAPIResponseData) => {
      if (data.hourly) {
        this.relativeHumidityChartData = data.hourly;
        this.relativeHumidityUnits = data.hourly_units?.relativehumidity_2m

        const columnChartElem: any = document.getElementById('column_chart');
        const lineChar = new Chart(columnChartElem.getContext('2d'), {
          type: 'bar',
          data: {
            labels: this.relativeHumidityChartData?.time,
            datasets: [
              {
                data: this.relativeHumidityChartData?.relativehumidity_2m,
                label: 'Relative Humidity',
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                ticks: {
                  callback: function (value, index, values) {
                    const dateValue = this.getLabelForValue(index);
                    const date = new Date(dateValue).toLocaleDateString();
                    const time = new Date(dateValue).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    if (
                      index === 0 ||
                      new Date(dateValue).toLocaleDateString() !==
                        new Date(
                          this.getLabelForValue(index - 1)
                        ).toLocaleDateString()
                    ) {
                      return `${date}, ${time}`;
                    } else {
                      return `${date}, ${time}`;
                    }
                  },
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: `Relative Humidity (${this.relativeHumidityUnits})`,
                }
              },
            },
          },
        });
      }
    });
  }
}
