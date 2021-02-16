import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import useDeckStore from '../deck/useDeckStore'

const QuizScreen = ({ route, navigation }) => {
  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  useEffect(() => {
    if (deck !== null) {
      const title = `Quiz ${deck.name}`
      navigation.setOptions({ title })
    }
  }, [deck, navigation])

  return (
    <SafeAreaView>
      <Text>Quiz</Text>
    </SafeAreaView>
  )
}

export default QuizScreen
