import {Entypo} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {Card, FAB, Icon, Input, makeStyles, useTheme} from '@rneui/themed'
import {StatusBar} from 'expo-status-bar'
import React, {FC, useMemo} from 'react'
import {View, Text, Pressable} from 'react-native'

import {CircleLoader} from '../../components/circleLoader'
import {useColorScheme, useSearchCity} from '../../hooks'
import {useCitiesStore} from '../../store'
import {AppTheme} from '../../types/enums'
import {ICity, StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

export const AddCity: FC = () => {
  const {theme} = useTheme()
  const navigation = useNavigation()
  const {value, handleChangeSearch, result, error, loading} = useSearchCity<ICity>()
  const {addCity, removeCity, cities} = useCitiesStore()
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})

  const handleCity = (city: ICity, isAdd: boolean) => {
    if (isAdd) {
      addCity(city)
    } else {
      removeCity(city)
    }
  }

  const content = useMemo(() => {
    if (!value) return null

    if (loading) {
      return <CircleLoader size="large" color={theme.colors.primary} />
    }

    return result.map((city) => {
      const isAdded = cities.some((c) => c.name === city.name && c.country === city.country)

      return (
        <Card
          wrapperStyle={styles.card}
          containerStyle={styles.wrapper}
          key={`${city.country}_${city.name}`}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {city.name} / {city.country}
          </Text>
          <Pressable onPress={() => handleCity(city, !isAdded)} hitSlop={10}>
            {isAdded ? (
              <Entypo name="minus" size={24} color={primary} />
            ) : (
              <Entypo name="plus" size={24} color={primary} />
            )}
          </Pressable>
        </Card>
      )
    })
  }, [result, error, value, cities, loading])

  const clearInput = () => {
    handleChangeSearch('')
  }

  const rightIcon = useMemo(() => {
    if (!value) return

    return (
      <Pressable onPress={clearInput}>
        <Icon name="close" size={20} />
      </Pressable>
    )
  }, [value])

  return (
    <View style={styles.container}>
      <StatusBar style={AppTheme.light} />
      <View style={styles.headNotch} />
      <Text style={styles.title}>Search for a city</Text>
      <Input
        placeholder="City name"
        value={value}
        style={styles.input}
        errorStyle={{color: theme.colors.error}}
        errorMessage={error ? 'Could not find city' : ''}
        onChangeText={handleChangeSearch}
        rightIcon={rightIcon}
      />
      {content}
      <FAB
        onPress={navigation.goBack}
        style={styles.fab}
        buttonStyle={{backgroundColor: primary}}
        placement="right"
        icon={{name: 'close', color: secondary}}
      />
    </View>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  container: {
    paddingHorizontal: spacing.m,
    height: '100%',
  },
  headNotch: {
    height: spacing.xs,
    width: '25%',
    backgroundColor: theme.colors.grey3,
    borderRadius: spacing.s,
    marginTop: spacing.s,
    marginBottom: spacing.m,
    alignSelf: 'center',
  },
  title: {
    ...globalStyles.h2,
    color: props.primary,
  },
  text: {
    ...globalStyles.p,
    color: props.primary,
    maxWidth: '90%',
  },
  card: {
    ...globalStyles.centeredRow,
    borderRadius: spacing.s,
  },
  wrapper: {
    backgroundColor: props.secondary,
  },
  input: {
    color: props.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: '42%',
  },
}))
