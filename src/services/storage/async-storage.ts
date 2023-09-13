import AsyncStorage from '@react-native-async-storage/async-storage'

const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    throw error
  }
}

const getItem = async (key: string, withParse?: boolean) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (withParse && value) {
      return JSON.parse(value)
    }
    return value
  } catch (error) {
    throw error
  }
}

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    throw error
  }
}

const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    throw error
  }
}

export {setItem, getItem, removeItem, clear}
