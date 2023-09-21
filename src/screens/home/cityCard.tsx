import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {makeStyles, useTheme} from '@rneui/themed'
import React, {FC} from 'react'
import {Text, StyleSheet, Pressable} from 'react-native'

import {CircleLoader} from '../../components/circleLoader'
import {useCityInfo, useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {unitsSelector, useAppStore} from '../../store'
import {Routes, TUnits} from '../../types/enums'
import {ICity, StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'
import {getTemperature} from '../../utils'

interface CityCardProps {
  city: ICity
}

type Nav = NativeStackNavigationProp<RootStackParamList, Routes.Home>

export const CityCard: FC<CityCardProps> = ({city}) => {
  const tempUnits = useAppStore(unitsSelector)
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  const {theme} = useTheme()
  const {data, loading} = useCityInfo(city.name)
  const navigation = useNavigation<Nav>()

  const handlePress = () => {
    if (!data) return

    navigation.navigate(Routes.CityDetails, {
      cityName: `${city.name} / ${city.country}`,
      cityInfo: data,
    })
  }

  return (
    <Pressable onPress={handlePress} key={city.name} style={styles.cityContainer}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cityName}>
        {city.name} / {city.country}
      </Text>

      {loading || !data ? (
        <CircleLoader size="small" color={theme.colors.primary} />
      ) : (
        <Text style={styles.temperatureText}>
          {getTemperature(data.current, tempUnits)} {tempUnits === TUnits.celsius ? '°C' : '°F'}
        </Text>
      )}
    </Pressable>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  cityContainer: {
    ...globalStyles.centeredRow,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: spacing.s,
    borderColor: props.primary,
    padding: spacing.m,
    backgroundColor: props.secondary,
  },
  cityName: {
    ...globalStyles.h2light,
    maxWidth: '80%',
    color: props.primary,
  },
  temperatureText: {
    ...globalStyles.h1,
    color: props.primary,
  },
}))
