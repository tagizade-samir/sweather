import {TUnits} from '../types/enums'
import {ICurrent} from '../types/interfaces'

export const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getTemperature = (current: ICurrent, temp: TUnits) => {
  return temp === TUnits.celsius ? current.temp_c : current.temp_f
}
