export interface DailyData {
  time: Array<string>,
  temperature_2m_max: Array<number>,
  temperature_2m_min: Array<number>
}

export interface DailyUnits {
  time: string,
  temperature_2m_max: string,
  temperature_2m_min: string
}

export interface HourlyData {
  time: Array<number>,
  relativehumidity_2m: Array<number>,
  direct_radiation: Array<number>
}

export interface HourlyUnits {
  time: string,
  relativehumidity_2m: string,
  direct_radiation: string
}

export interface WeatherAPIResponseData {
  daily: DailyData;
  daily_units: DailyUnits;
  hourly: HourlyData;
  hourly_units: HourlyUnits;
}

