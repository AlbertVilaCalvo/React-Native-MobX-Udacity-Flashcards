import React, { useRef, useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import sharedStyles from '../styles/sharedStyles'
import useDeckStore from '../deck/useDeckStore'
import { Card } from '../deck/Card'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomButton from '../components/styled/CustomButton'

const NewCardScreen = ({ route, navigation }) => {
  const answerInput = useRef()

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  const onPress = () => {
    if (question.trim() === '' || answer.trim() === '') {
      return
    }
    deck.addCard(new Card(question, answer))
    navigation.goBack()
  }

  return (
    <CustomSafeAreaView
      style={sharedStyles.containerCenterVerticalPaddingHorizontal}>
      <TextInput
        style={[sharedStyles.textInput, styles.textInputQuestion]}
        placeholder="Question"
        onChangeText={setQuestion}
        value={question}
        returnKeyType="next"
        onSubmitEditing={() => answerInput.current.focus()}
      />
      <TextInput
        ref={answerInput}
        style={[sharedStyles.textInput, styles.textInputAnswer]}
        placeholder="Answer"
        onChangeText={setAnswer}
        value={answer}
        returnKeyType="done"
        onSubmitEditing={onPress}
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
