import 'react-native-gesture-handler'
import {ThemeProvider} from '@rneui/themed'
import {useFonts} from 'expo-font'

import {RootNavigator} from './src/navigation'
import {theme} from './src/ui-kit'

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
  })

  if (!fontsLoaded || fontError) return null

  return (
    <ThemeProvider theme={theme}>
      <RootNavigator />
    </ThemeProvider>
  )
}
