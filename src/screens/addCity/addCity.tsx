import {Entypo} from '@expo/vector-icons'
import {Card, Input, useTheme} from '@rneui/themed'
import React, {FC, useMemo} from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Pressable} from 'react-native'

import {useSearchCity} from '../../hooks'
import {useCitiesStore} from '../../srore'
import {ICity} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

export const AddCity: FC = () => {
  const {theme} = useTheme()
  const {value, handleChangeSearch, result, error} = useSearchCity<ICity>()
  const {addCity, removeCity, cities} = useCitiesStore()

  const handleCity = (city: ICity, isAdd: boolean) => {
    if (isAdd) {
      addCity(city)
    } else {
      removeCity(city)
    }
  }

  const content = useMemo(() => {
    if (!value) return null

    if (value && (!result.length || error)) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />
    }

    return result.map((city) => {
      const isAdded = cities.some((c) => c.name === city.name)

      return (
        <Card
          wrapperStyle={[styles.card]}
          containerStyle={{backgroundColor: isAdded ? theme.colors.black : theme.colors.white}}
          key={city.name}>
          <Text
            style={[globalStyles.p, {color: isAdded ? theme.colors.white : theme.colors.black}]}>
            {city.country} / {city.name}
          </Text>
          <Pressable onPress={() => handleCity(city, !isAdded)} hitSlop={10}>
            {isAdded ? (
              <Entypo
                name="minus"
                size={24}
                color={isAdded ? theme.colors.white : theme.colors.black}
              />
            ) : (
              <Entypo
                name="plus"
                size={24}
                color={isAdded ? theme.colors.white : theme.colors.black}
              />
            )}
          </Pressable>
        </Card>
      )
    })
  }, [result, error, value, cities])

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
  card: {
    ...globalStyles.centeredRow,
    borderRadius: spacing.s,
  },
})
