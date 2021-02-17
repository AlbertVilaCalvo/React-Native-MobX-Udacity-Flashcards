import React, { useState } from 'react'
import { Button, TextInput, StyleSheet, View } from 'react-native'
import sharedStyles from '../styles/sharedStyles'
import useDeckStore from '../deck/useDeckStore'
import { Card } from '../deck/Card'

const NewCardScreen = ({ route, navigation }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  const onPress = () => {
    deck.addCard(new Card(question, answer))
    navigation.goBack()
  }

  return (
    <View
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
    </View>
  )
}

export default NewCardScreen

const styles = StyleSheet.create({
  textInputAnswer: {
    marginBottom: 20,
  },
})
