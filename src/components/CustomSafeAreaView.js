import React from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CustomSafeAreaView(props) {
  const edges = Platform.select({
    ios: ['right', 'bottom', 'left'],
    android: ['right', 'bottom', 'left', 'top'],
  })
  return (
    <SafeAreaView style={[{ flex: 1 }, props.style]} edges={edges} {...props}>
      {props.children}
    </SafeAreaView>
  )
}
