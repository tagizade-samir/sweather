import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  p: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Kanit-Medium',
  },
  h1: {
    color: '#000',
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
  },
  h2: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Kanit-Medium',
  },
  h3: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
  xxl: 64,
}

export {globalStyles, spacing}
