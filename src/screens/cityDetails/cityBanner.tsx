import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {useColorScheme} from '../../hooks'
import {unitsSelector, useAppStore} from '../../store'
import {TUnits} from '../../types/enums'
import {IAstro, ICurrent, IDay, StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'
import {getMaxTemp, getMinTemp, getTemperature} from '../../utils'

interface CityBannerProps {
  current: ICurrent
  cityName: string
  dailyInfo: IDay
  astro: IAstro
}

export const CityBanner: FC<CityBannerProps> = ({current, cityName, dailyInfo, astro}) => {
  const tempUnits = useAppStore(unitsSelector)
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  return (
    <View style={styles.cityBanner}>
      <View>
        <Text style={styles.temperatureText}>
          {getTemperature(current, tempUnits)} {tempUnits === TUnits.celsius ? '°C' : '°F'}
        </Text>
        <Text style={styles.cityNameText}>{cityName}</Text>
      </View>
      <View>
        <Text style={styles.smallTempText}>
          Max temp: {getMaxTemp(dailyInfo, tempUnits)} {tempUnits === TUnits.celsius ? '°C' : '°F'}
        </Text>
        <Text style={styles.smallTempText}>
          Min temp: {getMinTemp(dailyInfo, tempUnits)} {tempUnits === TUnits.celsius ? '°C' : '°F'}
        </Text>
        <Text style={styles.smallTempText}>Sunrise: {astro.sunrise}</Text>
        <Text style={styles.smallTempText}>Sunset: {astro.sunset}</Text>
      </View>
    </View>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  cityBanner: {
    width: '100%',
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.m,
    backgroundColor: props.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: props.secondary,
    borderRadius: spacing.s,
    marginBottom: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperatureText: {
    ...globalStyles.bannerTitle,
    color: props.secondary,
  },
  cityNameText: {
    ...globalStyles.h2light,
    color: props.secondary,
  },
  smallTempText: {
    ...globalStyles.smallTextLight,
    color: props.secondary,
  },
}))
