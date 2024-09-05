export type ButtonType = 'primary' | 'secondary' | 'circular';

export type MessageType = 'information' | 'success' | 'warning' | 'error';

export interface MessageProps {
  bgColor: string;
  color: string;
  icon: any;
}

export interface History {
  [key: string]: number;
}

interface Coordinate {
  lat: number;
  lon: number;
}

interface WeatherDisplay {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface BaseWeatherResponse {
  clouds: {
    all: number;
  };
  dt: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf?: number;
    temp_max: number;
    temp_min: number;
  };
  rain: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  visibility: number;
  weather: WeatherDisplay[];
  wind: {
    deg: number;
    gust?: number;
    speed: number;
  };
}

export interface CurrentWeatherResponse extends BaseWeatherResponse {
  base: string;
  cod: number;
  coord: Coordinate;
  id: number;
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
}

export interface GeocodingResponse extends Coordinate {
  country: string;
  local_names: {
    [key: string]: string;
  };
  name: string;
}

export interface ResponseError {
  cod: string;
  message: string;
}

export interface WeatherData {
  timezone: number;
  description: string;
  icon: string;
  temperature: {
    value: number;
    max: number;
    min: number;
    unit: string;
  };
  humidity: {
    value: number;
    unit: string;
  };
}
