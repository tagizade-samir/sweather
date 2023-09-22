import React, {FC} from 'react'
import {ActivityIndicator} from 'react-native'

interface CircleLoaderProps {
  size: 'large' | 'small'
  color: string
}

export const CircleLoader: FC<CircleLoaderProps> = ({size, color}) => {
  return <ActivityIndicator size="large" color={color} />
}
