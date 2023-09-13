import {useEffect, useState} from 'react'

import {getItem} from '../services'
import {StorageKeys} from '../types/enums'

export const useCities = () => {
  const [cities, setCities] = useState([])

  useEffect(() => {
    const getCities = async () => {
      const cities = await getItem(StorageKeys.cities, true)
      if (!cities) return

      setCities(cities)
    }
    getCities()
  }, [])

  return {cities}
}
