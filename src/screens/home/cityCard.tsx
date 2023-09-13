import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {useCityInfo} from '../../hooks'
import {ICity} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

interface CityCardProps {
  city: ICity
}

export const CityCard: FC<CityCardProps> = ({city}) => {
  const styles = useStyles()
  const {data} = useCityInfo(city.name)

  return (
    <View key={city.name} style={styles.cityContainer}>
      <Text style={globalStyles.h2}>
        {city.country} / {city.name}
      </Text>
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  cityContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: spacing.s,
    borderColor: theme.colors.primary,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
  },
}))
