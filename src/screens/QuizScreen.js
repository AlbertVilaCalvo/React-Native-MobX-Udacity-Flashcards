import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import useDeckStore from '../deck/useDeckStore'
import DeckNotFound from '../components/DeckNotFound'
import QuizViewPager from '../components/QuizViewPager'

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

  if (deck === null) {
    return <DeckNotFound deckId={deckId} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Quiz</Text>
      <QuizViewPager deck={deck} />
    </SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
