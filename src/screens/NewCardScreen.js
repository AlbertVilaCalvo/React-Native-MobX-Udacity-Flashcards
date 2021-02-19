import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import sharedStyles from '../styles/sharedStyles'
import useDeckStore from '../deck/useDeckStore'
import { Card } from '../deck/Card'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomButton from '../components/styled/CustomButton'

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
    <CustomSafeAreaView
      style={sharedStyles.containerCenterVerticalPaddingHorizontal}>
      <TextInput
        style={[sharedStyles.textInput, styles.textInputQuestion]}
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
      <CustomButton
        text="Add Card"
        disabled={question.trim() === '' || answer.trim() === ''}
        onPress={onPress}
      />
    </CustomSafeAreaView>
  )
}

export default NewCardScreen

const styles = StyleSheet.create({
  textInputQuestion: {
    marginBottom: 20,
  },
  textInputAnswer: {
    marginBottom: 40,
  },
})
