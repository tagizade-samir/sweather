import {axiosClient} from './axios'
import {ApiRoutes} from '../../types/enums'

export class Api {
  public static searchCity = async (city: string) => {
    try {
      const response = await axiosClient.get(
        `${ApiRoutes.search}.json?key=30fbb97d769542fd832132738231109&q=${city}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public static fetchCityInfo = async (city: string) => {
    try {
      const response = await axiosClient.get(
        `${ApiRoutes.forecast}.json?key=30fbb97d769542fd832132738231109&q=${city}&days=1&aqi=no&alerts=no`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}
