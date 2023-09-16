import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import {TemperatureUnits} from '../types/enums'

export interface AppState {
  temperatureUnits: TemperatureUnits
  updateUnits: (newUnit: TemperatureUnits) => void
}

export const useAppStore = create(
  persist<AppState>(
    (set, get) => ({
      temperatureUnits: TemperatureUnits.celsius,
      updateUnits: (newUnit: TemperatureUnits) =>
        set(() => ({
          temperatureUnits: newUnit,
        })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export const unitsSelector = (state: AppState) => state.temperatureUnits
