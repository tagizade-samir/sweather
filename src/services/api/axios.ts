import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://api.weatherapi.com/v1/',
  timeout: 1000,
})
