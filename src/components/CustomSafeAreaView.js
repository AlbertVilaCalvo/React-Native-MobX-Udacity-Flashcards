import React from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CustomSafeAreaView(props) {
  const edges =
    Platform.OS === 'ios'
      ? ['right', 'bottom', 'left']
      : ['right', 'bottom', 'left', 'top']
  return (
    <SafeAreaView style={[{ flex: 1 }, props.style]} edges={edges} {...props}>
      {props.children}
    </SafeAreaView>
  )
}
