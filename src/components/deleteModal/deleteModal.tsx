import {Button, Dialog, makeStyles} from '@rneui/themed'
import React, {FC} from 'react'
import {Text} from 'react-native'

import {useColorScheme} from '../../hooks'
import {StyleProps} from '../../types/interfaces'
import {globalStyles, spacing} from '../../ui-kit'

interface DeleteModalProps {
  isVisible: boolean
  onBackdropPress: () => void
  text: string
  onPressDelete: () => void
}

export const DeleteModal: FC<DeleteModalProps> = ({
  isVisible,
  text,
  onBackdropPress,
  onPressDelete,
}) => {
  const {
    colors: {primary, secondary},
  } = useColorScheme()
  const styles = useStyles({primary, secondary})
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <Text style={styles.text}>{text}</Text>
      <Button containerStyle={styles.button} onPress={onPressDelete}>
        Confirm
      </Button>
      <Button type="outline" onPress={onBackdropPress}>
        Cancel
      </Button>
    </Dialog>
  )
}

const useStyles = makeStyles((theme, props: StyleProps) => ({
  text: {
    textAlign: 'center',
    marginBottom: spacing.l,
    ...globalStyles.h2light,
  },
  button: {
    marginBottom: spacing.s,
  },
}))
