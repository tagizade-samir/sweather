import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import {setItem} from '../services'
import {StorageKeys} from '../types/enums'
import {ICity} from '../types/interfaces'

export interface CitiesState {
  cities: ICity[]
  addCity: (newCity: ICity) => void
  removeCity: (city: Pick<ICity, 'name'>) => void
}

export const useCitiesStore = create(
  persist<CitiesState>(
    (set, get) => ({
      cities: [],
      addCity: (newCity: ICity) =>
        set((state) => {
          const newCities = [...state.cities, newCity]
          setItem(StorageKeys.cities, JSON.stringify(newCities))
          return {cities: newCities}
        }),
      removeCity: (cityName: Pick<ICity, 'name'>) =>
        set((state) => {
          const newCities = state.cities.filter((city) => city.name !== cityName.name)
          setItem(StorageKeys.cities, JSON.stringify(newCities))
          return {cities: newCities}
        }),
    }),
    {
      name: 'cities-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
