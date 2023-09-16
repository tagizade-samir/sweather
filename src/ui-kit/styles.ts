import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  p: {
    fontSize: 18,
    fontFamily: 'Kanit-Medium',
  },
  bannerTitle: {
    fontFamily: 'Kanit-Medium',
    fontSize: 56,
  },
  h1: {
    fontSize: 32,
    fontFamily: 'Kanit-Medium',
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Kanit-Medium',
  },
  h3: {
    fontSize: 20,
    fontFamily: 'Kanit-Medium',
  },
  h1light: {
    fontSize: 32,
    fontFamily: 'Kanit-Light',
  },
  h2light: {
    fontSize: 24,
    fontFamily: 'Kanit-Light',
  },
  h3light: {
    fontSize: 20,
    fontFamily: 'Kanit-Light',
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
