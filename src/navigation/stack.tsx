import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useColorScheme} from '../hooks'
import {AddCity} from '../screens/addCity'
import {CityDetails} from '../screens/cityDetails'
import {Home} from '../screens/home'
import {Routes} from '../types/enums'
import {ICityInfo} from '../types/interfaces'

export type RootStackParamList = {
  [Routes.Home]: undefined
  [Routes.AddCity]: undefined
  [Routes.CityDetails]: {cityName: string; cityInfo: ICityInfo}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackNavigation = () => {
  const {
    colors: {secondary},
  } = useColorScheme()

  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{headerShown: false, contentStyle: {backgroundColor: secondary}}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen options={{presentation: 'modal'}} name={Routes.AddCity} component={AddCity} />
      <Stack.Screen name={Routes.CityDetails} component={CityDetails} />
    </Stack.Navigator>
  )
}
