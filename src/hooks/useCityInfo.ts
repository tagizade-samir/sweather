import {useEffect, useState} from 'react'

import {Api} from '../services/api'
import {ICityInfo} from '../types/interfaces'

export const useCityInfo = (city: string) => {
  const [data, setData] = useState<ICityInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getCityInfo = async () => {
      try {
        setLoading(true)
        setError(null)
        const cityInfo = await Api.fetchCityInfo(city)
        setData(cityInfo)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getCityInfo()
  }, [city])

  return {data, error, loading}
}
