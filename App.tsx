import 'react-native-gesture-handler'
import {ThemeProvider} from '@rneui/themed'
import {Canvas, Circle, Image, ImageShader, mix} from '@shopify/react-native-skia'
import {useFonts} from 'expo-font'
import {StatusBar} from 'expo-status-bar'
import React, {useReducer, useRef} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {useDerivedValue, useSharedValue} from 'react-native-reanimated'

import {ColorSchemeContext} from './src/context'
import {RootNavigator} from './src/navigation'
import {AppTheme} from './src/types/enums'
import {IThemeState} from './src/types/interfaces'
import {globalStyles, theme} from './src/ui-kit'

const {width, height} = Dimensions.get('window')

const defaultValue: IThemeState = {
  theme: AppTheme.light,
  active: false,
  colors: {
    primary: '#0B132B',
    secondary: '#fff',
  },
  overlay1: null,
  overlay2: null,
}

const themeReducer = (_: IThemeState, action: any) => {
  return action
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
  })
  const ref = useRef(null)
  const transition = useSharedValue(0)
  const circle = useSharedValue({x: 0, y: 0, radius: 0})

  const [{theme: colorTheme, colors, active, overlay1, overlay2}, dispatch] = useReducer(
    themeReducer,
    defaultValue
  )

  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.radius)
  })

  if (!fontsLoaded || fontError) return null

  return (
    <ColorSchemeContext.Provider
      value={{
        theme: colorTheme,
        colors,
        active,
        overlay1,
        overlay2,
        dispatch,
        ref,
        transition,
        circle,
      }}>
      <ThemeProvider theme={theme}>
        <StatusBar style={colorTheme === AppTheme.dark ? AppTheme.light : AppTheme.dark} />
        <View style={globalStyles.f1} ref={ref}>
          <RootNavigator />
        </View>
        {overlay1 && (
          <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
            <Image image={overlay1} x={0} y={0} width={width} height={height} />
            {overlay2 && (
              <Circle c={circle} r={r}>
                <ImageShader
                  fit="cover"
                  image={overlay2}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                />
              </Circle>
            )}
          </Canvas>
        )}
      </ThemeProvider>
    </ColorSchemeContext.Provider>
  )
}
