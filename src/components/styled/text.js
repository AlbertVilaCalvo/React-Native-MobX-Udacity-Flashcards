import React from 'react'
import { StyleSheet, Text } from 'react-native'

export function TextTitle(props) {
  return <Text style={[styles.textTitle, props.style]}>{props.children}</Text>
}

export function TextHeading(props) {
  return <Text style={[styles.textHeading, props.style]}>{props.children}</Text>
}

export function TextBody(props) {
  return <Text style={[styles.textBody, props.style]}>{props.children}</Text>
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  textHeading: {
    fontSize: 24,
  },
  textBody: {
    fontSize: 18,
  },
})
