import {makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {View, Text} from 'react-native'

import {useColorScheme} from '../../hooks'
import {globalStyles} from '../../ui-kit'

interface DetailRowProps {
  title: string
  value: string | number
}

export const DetailRow: FC<DetailRowProps> = ({title, value}) => {
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

interface StyleProps {
  primary: string
  secondary: string
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  row: {
    ...globalStyles.centeredRow,
  },
  title: {
    ...globalStyles.h2light,
    color: props.primary,
  },
  value: {
    ...globalStyles.h3light,
    color: props.primary,
  },
}))
