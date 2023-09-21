import AsyncStorage from '@react-native-async-storage/async-storage'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import {TUnits} from '../types/enums'

export interface AppState {
  temperatureUnits: TUnits
  updateUnits: (newUnit: TUnits) => void
}

export const useAppStore = create(
  persist<AppState>(
    (set, get) => ({
      temperatureUnits: TUnits.celsius,
      updateUnits: (newUnit: TUnits) =>
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
