import React, { useState } from 'react'
import { Button, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import sharedStyles from '../styles/sharedStyles'

const NewCardScreen = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onPress = () => {}

  return (
    <SafeAreaView
      style={[
        sharedStyles.containerCenteredVertical,
        sharedStyles.containerPadding,
      ]}>
      <TextInput
        style={sharedStyles.textInput}
        placeholder="Question"
        onChangeText={(text) => setQuestion(text)}
        defaultValue={question}
      />
      <TextInput
        style={[sharedStyles.textInput, styles.textInputAnswer]}
        placeholder="Answer"
        onChangeText={(text) => setAnswer(text)}
        defaultValue={answer}
      />
      <Button
        title="Add Card"
        disabled={question.trim() === '' || answer.trim() === ''}
        onPress={onPress}
      />
    </SafeAreaView>
  )
}

export default NewCardScreen

const styles = StyleSheet.create({
  textInputAnswer: {
    marginBottom: 20,
  },
})
