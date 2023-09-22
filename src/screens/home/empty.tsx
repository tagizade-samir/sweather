import {useNavigation} from '@react-navigation/native'
import type {StackNavigationProp} from '@react-navigation/stack'
import {Button} from '@rneui/themed'
import React, {FC} from 'react'
import {View} from 'react-native'

import {useColorScheme} from '../../hooks'
import {RootStackParamList} from '../../navigation'
import {Routes} from '../../types/enums'
import {globalStyles} from '../../ui-kit'

type Nav = StackNavigationProp<RootStackParamList, Routes.Home>

export const EmptyHome: FC = () => {
  const navigation = useNavigation<Nav>()
  const {
    colors: {primary},
  } = useColorScheme()

  const handlePress = () => {
    navigation.navigate(Routes.AddCity)
  }

  return (
    <View style={globalStyles.centeredContainer}>
      <Button
        containerStyle={{borderColor: primary}}
        titleStyle={{color: primary}}
        onPress={handlePress}
        color="secondary"
        title="Add your first city"
        type="outline"
      />
    </View>
  )
}
