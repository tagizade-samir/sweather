import {dist, makeImageFromView, vec} from '@shopify/react-native-skia'
import React, {useCallback} from 'react'
import {Dimensions} from 'react-native'
import {withTiming} from 'react-native-reanimated'

import {ColorSchemeContext} from '../context'
import {AppTheme} from '../types/enums'
import {wait} from '../utils'

const {width, height} = Dimensions.get('window')
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)]

export const useColorScheme = () => {
  const context = React.useContext(ColorSchemeContext)

  if (!context) {
    throw new Error('useColorScheme must be used within a ColorSchemeProvider')
  }

  const {
    theme,
    dispatch,
    colors: {primary, secondary},
    ref,
    circle,
    transition,
    active,
  } = context

  const toggleColorTheme = useCallback(
    async (x: number, y: number) => {
      dispatch({
        theme,
        active: true,
        colors: {
          primary,
          secondary,
        },
        overlay1: null,
        overlay2: null,
      })
      // Get first overlay
      circle.value = {x, y, radius: Math.max(...corners.map((corner) => dist(corner, {x, y})))}
      const overlay1 = await makeImageFromView(ref)
      dispatch({
        theme,
        active: true,
        colors: {
          primary,
          secondary,
        },
        overlay1,
        overlay2: null,
      })

      await wait(10)

      dispatch({
        theme,
        active: true,
        colors: {
          primary: theme === AppTheme.dark ? '#0B132B' : '#fff',
          secondary: theme === AppTheme.dark ? '#fff' : '#0B132B',
        },
        overlay1,
        overlay2: null,
      })

      await wait(10)
      const overlay2 = await makeImageFromView(ref)

      dispatch({
        theme,
        active: true,
        colors: {
          primary: theme === AppTheme.dark ? '#0B132B' : '#fff',
          secondary: theme === AppTheme.dark ? '#fff' : '#0B132B',
        },
        overlay1,
        overlay2,
      })
      const duration = 650
      transition.value = 0
      transition.value = withTiming(1, {duration})
      await wait(duration)
      dispatch({
        theme: theme === AppTheme.dark ? AppTheme.light : AppTheme.dark,
        active: false,
        colors: {
          primary: theme === AppTheme.dark ? '#0B132B' : '#fff',
          secondary: theme === AppTheme.dark ? '#fff' : '#0B132B',
        },
        overlay1: null,
        overlay2: null,
      })
    },
    [circle, ref, dispatch, theme, primary, secondary, transition]
  )

  return {toggleColorTheme, theme, colors: {primary, secondary}, active}
}
