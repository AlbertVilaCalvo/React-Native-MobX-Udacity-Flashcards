import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Color } from '../../styles/Color'
import { Dimension } from '../../styles/Dimension'
import { TextBody } from './text'
import PropTypes from 'prop-types'
import { isAndroid } from '../../utils/platform'

export default function CustomButton({
  text,
  onPress,
  style,
  disabled = false,
  ...rest
}) {
  const androidRipple = isAndroid ? { android_ripple: { color: 'white' } } : {}
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      {...androidRipple}
      {...rest}
      style={({ pressed }) => [
        styles.pressable,
        {
          backgroundColor: disabled
            ? Color.primaryLight
            : isAndroid // Android has ripple, so no need to change background
            ? Color.primary
            : pressed // iOS
            ? Color.primaryLight
            : Color.primary,
        },
        style,
      ]}>
      <TextBody style={styles.text}>{text}</TextBody>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Dimension.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
})

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
}
