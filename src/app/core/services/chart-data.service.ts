import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private apiEndpoint = 'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=2023-01-01&end_date=2023-01-10';
  private chartDataSubject = new BehaviorSubject<any>({});
  public chartData$ = this.chartDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiEndpoint)
  }

  updateChartData(data: any): void {
    this.chartDataSubject.next(data);
  }
}
