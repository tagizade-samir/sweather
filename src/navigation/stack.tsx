import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {useColorScheme} from '../hooks'
import {AddCity} from '../screens/addCity'
import {CityDetails} from '../screens/cityDetails'
import {Home} from '../screens/home'
import {HourDetails} from '../screens/hourDetails'
import {Routes} from '../types/enums'
import {ICityInfo, IHour} from '../types/interfaces'

export type RootStackParamList = {
  [Routes.Home]: undefined
  [Routes.AddCity]: undefined
  [Routes.CityDetails]: {cityName: string; cityInfo: ICityInfo}
  [Routes.HourDetails]: {hourDetails: IHour}
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
      <Stack.Screen
        options={{presentation: 'modal'}}
        name={Routes.HourDetails}
        component={HourDetails}
      />
    </Stack.Navigator>
  )
}
