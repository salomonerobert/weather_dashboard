import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts'
import { DirectRadiationChartComponent } from './components/direct-radiation/direct-radiation.component';
import { RelativeHumidityChartComponent } from './components/relative-humidity/relative-humidity.component';
import { TemperatureChartComponent } from './components/temperature/temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsolidatedChartsComponent } from './components/consolidated-charts/consolidated-charts.component';

const routes: Routes = [
  {path: 'direct-radiation', component: DirectRadiationChartComponent},
  {path: 'relative-humidity', component: RelativeHumidityChartComponent},
  {path: 'temperature', component: TemperatureChartComponent},
  {path: '**', component: ConsolidatedChartsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TemperatureChartComponent,
    DirectRadiationChartComponent,
    RelativeHumidityChartComponent,
    ConsolidatedChartsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgChartsModule,
    HttpClientModule
  ],
  providers: [NgChartsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
