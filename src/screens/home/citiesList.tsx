import {FAB, makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, ScrollView} from 'react-native'

import {CityCard} from './cityCard'
import {ICity} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

interface CitiesListProps {
  cities: ICity[]
}

export const CitiesList: FC<CitiesListProps> = ({cities}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <ScrollView>
        {cities.map((city) => {
          return <CityCard key={city.name} city={city} />
        })}
      </ScrollView>
      <FAB style={styles.fab} placement="right" icon={{name: 'add', color: 'white'}} />
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    ...globalStyles.f1,
    paddingHorizontal: spacing.m,
  },
  fab: {
    position: 'absolute',
  },
}))
