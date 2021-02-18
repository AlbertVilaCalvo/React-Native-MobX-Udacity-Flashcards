import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isiOS } from '../utils/platform'

export default function CustomSafeAreaView(props) {
  const edges = isiOS
    ? ['right', 'bottom', 'left']
    : ['right', 'bottom', 'left', 'top']
  return (
    <SafeAreaView style={[{ flex: 1 }, props.style]} edges={edges} {...props}>
      {props.children}
    </SafeAreaView>
  )
}
