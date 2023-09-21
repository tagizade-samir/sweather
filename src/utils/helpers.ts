import {TUnits} from '../types/enums'
import {ICurrent, IDay, IHour} from '../types/interfaces'

export const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTemperature = (data: ICurrent | IHour, temp: TUnits) => {
  return temp === TUnits.celsius ? data.temp_c : data.temp_f
}

export const getFeelsLike = (data: ICurrent | IHour, temp: TUnits) => {
  return temp === TUnits.celsius ? data.feelslike_c : data.feelslike_f
}

export const getMaxTemp = (daily: IDay, temp: TUnits) => {
  return temp === TUnits.celsius ? daily.maxtemp_c : daily.maxtemp_f
}

export const getMinTemp = (daily: IDay, temp: TUnits) => {
  return temp === TUnits.celsius ? daily.mintemp_c : daily.mintemp_f
}

export const getTime = (dateString: string) => {
  const date = new Date(dateString)
  const hours = date.getHours()
  return hours < 10 ? `0${hours}` : hours
}
