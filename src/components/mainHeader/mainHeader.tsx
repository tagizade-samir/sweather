import {Feather, MaterialCommunityIcons} from '@expo/vector-icons'
import {Switch, makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View} from 'react-native'
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'

import {useColorScheme} from '../../hooks'
import {useAppStore} from '../../store'
import {AppTheme, TUnits} from '../../types/enums'
import {globalStyles, spacing} from '../../ui-kit'

export const MainHeader: FC = () => {
  const styles = useStyles()
  const {temperatureUnits: units, updateUnits} = useAppStore()
  const {
    theme,
    colors: {primary, secondary},
    active,
    toggleColorTheme,
  } = useColorScheme()

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin((event) => {
      if (!active) {
        toggleColorTheme(event.absoluteX, event.absoluteY)
      }
    })

  const handleChangeTemperatureUnits = () => {
    updateUnits(units === TUnits.celsius ? TUnits.fahrenheit : TUnits.celsius)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.leftContainer}>
        <MaterialCommunityIcons name="temperature-fahrenheit" size={24} color={primary} />
        <Switch
          thumbColor={secondary}
          trackColor={{true: primary, false: secondary}}
          ios_backgroundColor={primary}
          value={units === TUnits.celsius}
          onChange={handleChangeTemperatureUnits}
        />
        <MaterialCommunityIcons name="temperature-celsius" size={24} color={primary} />
      </View>
      <GestureDetector gesture={pan}>
        <Feather name={theme === AppTheme.dark ? 'sun' : 'moon'} size={24} color={primary} />
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    ...globalStyles.centeredRow,
    width: '100%',
    paddingHorizontal: spacing.l,
    height: 50,
    justifyContent: 'space-between',
    zIndex: 100,
  },
  leftContainer: {
    ...globalStyles.centeredRow,
    gap: spacing.s,
  },
}))
