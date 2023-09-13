import {axiosClient} from './axios'

export class Api {
  public static searchCity = async (city: string) => {
    try {
      const response = await axiosClient.get(
        `search.json?key=30fbb97d769542fd832132738231109&q=${city}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}
