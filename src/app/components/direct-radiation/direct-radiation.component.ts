import { Component, OnInit } from '@angular/core';
import { Chart, Tick, registerables } from 'chart.js';
import { WeatherAPIResponseData, HourlyData } from 'src/app/core/interfaces';
import { ChartDataService } from 'src/app/core/services/chart-data.service';

@Component({
  selector: 'app-direct-radiation-chart',
  templateUrl: './direct-radiation.component.html',
})
export class DirectRadiationChartComponent implements OnInit {
  directRadiationChartData: HourlyData;
  directRadiationUnits: string;

  constructor(private chartDataService: ChartDataService) {
    this.directRadiationChartData = {
      time: [],
      relativehumidity_2m: [],
      direct_radiation: []
    };
    this.directRadiationUnits = '';
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartDataService.chartData$.subscribe((data: WeatherAPIResponseData) => {
      if (data.hourly) {
        this.directRadiationChartData = data.hourly;
        this.directRadiationUnits = data.hourly_units?.direct_radiation

        const columnChartElem: any = document.getElementById('area_chart');
        const lineChar = new Chart(columnChartElem.getContext('2d'), {
          type: 'line',
          data: {
            labels: this.directRadiationChartData?.time,
            datasets: [
              {
                data: this.directRadiationChartData?.direct_radiation,
                fill: {
                  target: 'origin',
                  above: 'rgba(75, 192, 192, 0.3)',
                },
                label: 'Direct Radiation',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.3,
                pointRadius: 0,
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
                beginAtZero: true,
                title: {
                  display: true,
                  text: `Direct Radiation (${this.directRadiationUnits})`,
                }
              },
            },
          },
        });
      }
    });
  }
}
