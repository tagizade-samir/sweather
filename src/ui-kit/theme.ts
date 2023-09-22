import {createTheme} from '@rneui/themed'

export const theme = createTheme({
  lightColors: {
    primary: '#0B132B',
    secondary: '#1C2541',
    background: '#3A506B',
    error: '#e63946',
  },
  darkColors: {
    primary: '#0B132B',
    secondary: '#1C2541',
    background: '#3A506B',
    error: '#e63946',
  },
  components: {
    Button: {
      titleStyle: {
        fontFamily: 'Kanit-Medium',
      },
      containerStyle: {
        borderRadius: 8,
        borderWidth: 1,
      },
    },
  },
})
