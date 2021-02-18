import React, { useLayoutEffect } from 'react'
import { Text } from 'react-native'
import useDeckStore from '../deck/useDeckStore'
import DeckNotFound from '../components/DeckNotFound'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import QuizViewPager from '../components/QuizViewPager'

const QuizScreen = ({ route, navigation }) => {
  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  useLayoutEffect(() => {
    if (deck !== null) {
      const title = `Quiz ${deck.name}`
      navigation.setOptions({ title })
    }
  }, [deck, navigation])

  if (deck === null) {
    return <DeckNotFound deckId={deckId} />
  }

  return (
    <CustomSafeAreaView>
      <Text>Quiz</Text>
      <QuizViewPager deck={deck} />
    </CustomSafeAreaView>
  )
}

export default QuizScreen
