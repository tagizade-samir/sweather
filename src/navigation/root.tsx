import {NavigationContainer} from '@react-navigation/native'
import React, {FC} from 'react'

import {StackNavigation} from './stack'

export const RootNavigator: FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
