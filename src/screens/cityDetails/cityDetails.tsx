import {RouteProp, useRoute} from '@react-navigation/native'
import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {CityBanner} from './cityBanner'
import {CityHourCarousel} from './cityHourCarousel'
import {CityInfoBlock} from './cityInfoBlock'
import {RootStackParamList} from '../../navigation'
import {Routes} from '../../types/enums'
import {globalStyles, spacing} from '../../ui-kit'

const defaultParams = {
  cityName: '',
  cityInfo: {current: null},
}

type Route = RouteProp<RootStackParamList, Routes.CityDetails>

export const CityDetails: FC = () => {
  const styles = useStyles()
  const {params} = useRoute<Route>()
  const {
    cityName,
    cityInfo: {
      current,
      forecast: {forecastday},
    },
  } = params || defaultParams

  return (
    <SafeAreaView style={globalStyles.f1} edges={['left', 'right', 'top']}>
      <ScrollView
        nestedScrollEnabled
        style={globalStyles.f1}
        contentContainerStyle={styles.scrollContent}>
        <CityBanner
          astro={forecastday[0].astro}
          dailyInfo={forecastday[0].day}
          current={current}
          cityName={cityName}
        />
        <CityHourCarousel hoursData={forecastday[0].hour} />
        <CityInfoBlock current={current} />
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles((theme) => ({
  scrollContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.l,
  },
}))
