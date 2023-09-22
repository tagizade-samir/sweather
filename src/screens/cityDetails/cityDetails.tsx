import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {Button, makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {CityBanner} from './cityBanner'
import {CityHourCarousel} from './cityHourCarousel'
import {CityInfoBlock} from './cityInfoBlock'
import {DeleteModal} from '../../components/deleteModal'
import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {useCitiesStore} from '../../store'
import {Routes} from '../../types/enums'
import {StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

const defaultParams = {
  cityName: '',
  cityInfo: {current: null},
}

type Route = RouteProp<RootStackParamList, Routes.CityDetails>
type Nav = StackNavigationProp<RootStackParamList, Routes.CityDetails>

export const CityDetails: FC = () => {
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  const {params} = useRoute<Route>()
  const {goBack} = useNavigation<Nav>()
  const [showDeleteModal, setShowDeleteModal] = React.useState(false)
  const {removeCity} = useCitiesStore()
  const {
    cityName,
    cityInfo: {
      current,
      forecast: {forecastday},
      location: {name},
    },
  } = params || defaultParams

  const handleRemoveCity = () => {
    removeCity({name})
    goBack()
  }

  const onPressRemoveCity = () => {
    openDeleteModal()
  }

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  return (
    <SafeAreaView style={globalStyles.f1} edges={['left', 'right', 'top']}>
      <ScrollView
        nestedScrollEnabled
        style={globalStyles.f1}
        contentContainerStyle={styles.scrollContent}>
        <CityBanner
          astro={forecastday[0].astro}
          dailyInfo={forecastday[0].day}
          current={current}
          cityName={cityName}
        />
        <CityHourCarousel hoursData={forecastday[0].hour} />
        <CityInfoBlock current={current} />
        <Button
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={onPressRemoveCity}>
          Remove city
        </Button>
      </ScrollView>
      <DeleteModal
        onPressDelete={handleRemoveCity}
        isVisible={showDeleteModal}
        onBackdropPress={closeDeleteModal}
        text={`Are you sure you want to delete ${name} from your list?`}
      />
    </SafeAreaView>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  scrollContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.l,
  },
  button: {
    backgroundColor: props.primary,
  },
  buttonText: {
    color: props.secondary,
  },
}))
