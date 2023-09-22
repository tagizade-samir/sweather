import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {FAB, makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, ScrollView} from 'react-native'

import {CityCard} from './cityCard'
import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {Routes} from '../../types/enums'
import {ICity} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

interface CitiesListProps {
  cities: ICity[]
}

type Nav = StackNavigationProp<RootStackParamList, Routes.Home>

export const CitiesList: FC<CitiesListProps> = ({cities}) => {
  const styles = useStyles()
  const navigation = useNavigation<Nav>()
  const {
    colors: {primary, secondary},
  } = useColorScheme()

  const handlePress = () => {
    navigation.navigate(Routes.AddCity)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cities.map((city) => {
          return <CityCard key={city.name} city={city} />
        })}
      </ScrollView>
      <FAB
        onPress={handlePress}
        style={styles.fab}
        buttonStyle={{backgroundColor: primary}}
        placement="right"
        icon={{name: 'add', color: secondary}}
      />
    </View>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    ...globalStyles.f1,
    paddingHorizontal: spacing.m,
  },
  scrollContent: {
    gap: spacing.m,
    paddingTop: spacing.m,
  },
  fab: {
    position: 'absolute',
  },
}))
