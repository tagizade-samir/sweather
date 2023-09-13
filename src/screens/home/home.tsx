import React, {FC} from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {EmptyHome} from './empty'
import {useCities} from '../../hooks'
import {globalStyles, spacing} from '../../ui-kit'

export const Home: FC = () => {
  const {cities} = useCities()

  return <SafeAreaView style={globalStyles.f1}>{cities.length ? null : <EmptyHome />}</SafeAreaView>
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.p,
    marginBottom: spacing.m,
  },
})
