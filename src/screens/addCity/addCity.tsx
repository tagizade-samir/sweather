import {Card, Input, useTheme} from '@rneui/themed'
import React, {FC, useMemo} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

import {useSearchCity} from '../../hooks/useSearchCity'
import {ICity} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

export const AddCity: FC = () => {
  const {theme} = useTheme()
  const {value, handleChangeSearch, result, error} = useSearchCity<ICity>()

  const content = useMemo(() => {
    if (!value) return null

    if (value && (!result.length || error)) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />
    }

    return result.map((city) => (
      <Card key={city.name}>
        <Text style={globalStyles.p}>
          {city.country} / {city.name}
        </Text>
      </Card>
    ))
  }, [result, error, value])

  return (
    <View style={styles.container}>
      <Text style={globalStyles.h2}>Search for a city</Text>
      <Input
        placeholder="City name"
        value={value}
        errorStyle={{color: theme.colors.error}}
        errorMessage={error ? 'Could not find city' : ''}
        onChangeText={handleChangeSearch}
      />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.m,
    paddingHorizontal: spacing.m,
  },
})
