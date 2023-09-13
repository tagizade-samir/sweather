import {createStackNavigator} from '@react-navigation/stack'

import {AddCity} from '../screens/addCity'
import {Home} from '../screens/home'
import {Routes} from '../types/enums'

export type RootStackParamList = {
  [Routes.Home]: undefined
  [Routes.AddCity]: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Home} screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen options={{presentation: 'modal'}} name={Routes.AddCity} component={AddCity} />
    </Stack.Navigator>
  )
}
