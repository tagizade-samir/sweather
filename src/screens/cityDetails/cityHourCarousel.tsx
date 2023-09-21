import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {Text, ScrollView, Pressable} from 'react-native'

import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {unitsSelector, useAppStore} from '../../store'
import {Routes, TUnits} from '../../types/enums'
import {IHour, StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'
import {getTemperature, getTime} from '../../utils'

interface CityHourCarouselProps {
  hoursData: IHour[]
}

type Nav = StackNavigationProp<RootStackParamList, Routes.CityDetails>

export const CityHourCarousel: FC<CityHourCarouselProps> = ({hoursData}) => {
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  const tempUnits = useAppStore(unitsSelector)
  const navigation = useNavigation<Nav>()

  const handlePress = (hourDetails: IHour) => {
    navigation.navigate(Routes.HourDetails, {hourDetails})
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {hoursData.map((hour: IHour, index) => {
        return (
          <Pressable onPress={() => handlePress(hour)} style={styles.itemContainer} key={index}>
            <Text style={styles.itemText}>
              {getTemperature(hour, tempUnits)} {tempUnits === TUnits.celsius ? '°C' : '°F'}
            </Text>
            <Text style={styles.itemSubText}>{getTime(hour.time)}</Text>
          </Pressable>
        )
      })}
    </ScrollView>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  scrollContainer: {
    marginBottom: spacing.m,
  },
  scrollContent: {
    paddingVertical: spacing.s,
    gap: spacing.s,
  },
  itemContainer: {
    width: 80,
    backgroundColor: props.primary,
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
    ...globalStyles.centeredContainer,
  },
  itemText: {
    ...globalStyles.h3,
    color: props.secondary,
  },
  itemSubText: {
    ...globalStyles.pLight,
    color: props.secondary,
  },
}))
