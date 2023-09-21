import {RouteProp, useRoute} from '@react-navigation/native'
import {makeStyles} from '@rneui/themed'
import {StatusBar} from 'expo-status-bar'
import React, {FC} from 'react'
import {Text, ScrollView, View} from 'react-native'

import {DetailRow} from '../../components/detailRow'
import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {unitsSelector, useAppStore} from '../../store'
import {AppTheme, Routes, TUnits} from '../../types/enums'
import {StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'
import {getFeelsLike, getTemperature} from '../../utils'

type Route = RouteProp<RootStackParamList, Routes.HourDetails>

export const HourDetails: FC = () => {
  const {params} = useRoute<Route>()
  const {hourDetails} = params
  const tempUnits = useAppStore(unitsSelector)
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})

  if (!hourDetails) return null

  const temperature = tempUnits === TUnits.celsius ? '°C' : '°F'

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <StatusBar style={AppTheme.light} />
      <View style={styles.headNotch} />
      <Text style={styles.mainTitle}>
        {getTemperature(hourDetails, tempUnits)} {temperature}
      </Text>
      <Text style={styles.subtitle}>{hourDetails.time}</Text>
      <DetailRow
        title="Feels like"
        value={`${getFeelsLike(hourDetails, tempUnits)} ${temperature}`}
      />
      <DetailRow title="Chance of rain" value={`${hourDetails.chance_of_rain} %`} />
      <DetailRow title="Chance of snow" value={`${hourDetails.chance_of_snow} %`} />
      <DetailRow title="Condition" value={hourDetails.condition.text} />
      <DetailRow title="Humidity" value={`${hourDetails.humidity} %`} />
      <DetailRow title="Precipitation" value={`${hourDetails.precip_mm} mm`} />
      <DetailRow title="Pressure" value={`${hourDetails.pressure_mb} mb`} />
      <DetailRow title="Visibility" value={`${hourDetails.vis_km} km`} />
      <DetailRow title="UV index" value={hourDetails.uv} />
      <DetailRow title="Wind" value={`${hourDetails.wind_mph} mph`} />
      <DetailRow title="Gusts" value={`${hourDetails.gust_mph} mph`} />
    </ScrollView>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  headNotch: {
    height: spacing.xs,
    width: '25%',
    backgroundColor: theme.colors.grey3,
    borderRadius: spacing.s,
    marginTop: spacing.s,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingHorizontal: spacing.m,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  mainTitle: {
    ...globalStyles.bannerTitle,
    color: props.primary,
  },
  subtitle: {
    ...globalStyles.pLight,
    marginBottom: spacing.m,
    color: props.primary,
  },
}))
