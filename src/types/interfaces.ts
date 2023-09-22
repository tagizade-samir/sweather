import {SkImage} from '@shopify/react-native-skia'
import {RefObject} from 'react'
import {View} from 'react-native'
import {SharedValue} from 'react-native-reanimated'

import {AppTheme} from './enums'

export interface ICity {
  name: string
  country: string
  region: string
  lat: string
  lon: string
  url: string
}

interface ICondition {
  code: number
  icon: string // cdn.weatherapi.com/weather/64x64/night/116.png
  text: string
}

export interface ICurrent {
  cloud: number
  condition: ICondition
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  humidity: number
  is_day: number
  last_updated: string
  last_updated_epoch: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  uv: number
  vis_km: number
  vis_miles: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
}

export interface IAstro {
  is_moon_up: number
  is_sun_up: number
  moon_illumination: number
  moon_phase: string
  moonrise: string
  moonset: string
  sunrise: string
  sunset: string
}

export interface IDay {
  avghumidity: number
  avgtemp_c: number
  avgtemp_f: number
  avgvis_km: number
  avgvis_miles: number
  condition: ICondition
  daily_chance_of_rain: number
  daily_chance_of_snow: number
  daily_will_it_rain: number
  daily_will_it_snow: number
  maxtemp_c: number
  maxtemp_f: number
  maxwind_kph: number
  maxwind_mph: number
  mintemp_c: number
  mintemp_f: number
  totalprecip_in: number
  totalprecip_mm: number
  totalsnow_cm: number
  uv: number
}

export interface IHour {
  chance_of_rain: number
  chance_of_snow: number
  cloud: number
  condition: ICondition
  dewpoint_c: number
  dewpoint_f: number
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  heatindex_c: number
  heatindex_f: number
  humidity: number
  is_day: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  time: string
  time_epoch: number
  uv: number
  vis_km: number
  vis_miles: number
  will_it_rain: number
  will_it_snow: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
  windchill_c: number
  windchill_f: number
}

export interface IForecastday {
  astro: IAstro
  date: string
  date_epoch: number
  day: IDay
  hour: IHour[]
}

interface IForecast {
  forecastday: IForecastday[]
}

interface ILocation {
  country: string
  lat: number
  localtime: string
  localtime_epoch: number
  lon: number
  name: string
  region: string
  tz_id: string
}

export interface ICityInfo {
  current: ICurrent
  forecast: IForecast
  location: ILocation
}

export interface IThemeState {
  theme: AppTheme
  colors: {
    primary: string
    secondary: string
  }
  active: boolean
  overlay1: SkImage | null
  overlay2: SkImage | null
}

export interface IColorSchemeContext extends IThemeState {
  ref: RefObject<View>
  transition: SharedValue<number>
  circle: SharedValue<{x: number; y: number; radius: number}>
  dispatch: (theme: IThemeState) => void
}

export interface StyleProps {
  primary: string
  secondary: string
}
