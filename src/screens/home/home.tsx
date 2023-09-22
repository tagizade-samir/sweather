import React, {FC} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

import {CitiesList} from './citiesList'
import {EmptyHome} from './empty'
import {MainHeader} from '../../components/mainHeader'
import {useCitiesStore} from '../../store'
import {globalStyles} from '../../ui-kit'

export const Home: FC = () => {
  const cities = useCitiesStore((state) => state.cities)

  return (
    <SafeAreaView style={globalStyles.f1}>
      <MainHeader />
      {cities.length ? <CitiesList cities={cities} /> : <EmptyHome />}
    </SafeAreaView>
  )
}
