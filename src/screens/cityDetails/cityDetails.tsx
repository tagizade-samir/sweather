import {RouteProp, useRoute} from '@react-navigation/native'
import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {DetailRow} from './detailRow'
import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {Routes} from '../../types/enums'
import {globalStyles, spacing} from '../../ui-kit'

const defaultParams = {
  cityName: '',
  cityInfo: {current: null},
}

type Route = RouteProp<RootStackParamList, Routes.CityDetails>

export const CityDetails: FC = () => {
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  const {params} = useRoute<Route>()
  const {
    cityName,
    cityInfo: {current},
  } = params || defaultParams

  return (
    <SafeAreaView style={globalStyles.f1}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cityBanner}>
          <Text style={styles.temperatureText}>{current.temp_c} °C</Text>
          <Text style={styles.cityNameText}>{cityName}</Text>
        </View>
        <DetailRow title="Condition" value={current.condition.text} />
        <DetailRow title="Cloud" value={current.cloud} />
      </ScrollView>
    </SafeAreaView>
  )
}

interface StyleProps {
  primary: string
  secondary: string
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
  },
  temperatureText: {
    ...globalStyles.bannerTitle,
    color: props.secondary,
  },
  cityNameText: {
    ...globalStyles.h2light,
    color: props.secondary,
  },
  scrollContent: {
    ...globalStyles.f1,
    paddingHorizontal: spacing.m,
  },
}))
