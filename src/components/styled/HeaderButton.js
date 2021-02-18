import React from 'react'
import { Pressable, Text } from 'react-native'
import { Color } from '../../styles/Color'
import { Dimension } from '../../styles/Dimension'
import PropTypes from 'prop-types'

export default function HeaderButton({ text, onPress, ...rest }) {
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Color.primaryLight : 'transparent',
          paddingHorizontal: 8,
          paddingVertical: 6,
          marginRight: 5,
          borderRadius: Dimension.borderRadius,
        },
      ]}>
      <Text style={{ color: 'white' }}>{text}</Text>
    </Pressable>
  )
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
