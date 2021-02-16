import React, { useEffect } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import useDeckStore from '../deck/useDeckStore'
import DeckNotFound from '../components/DeckNotFound'
import ViewPager from '@react-native-community/viewpager'

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
    <SafeAreaView style={styles.mainContainer}>
      <Text>Quiz</Text>
      <ViewPager initialPage={0} style={styles.viewPager}>
        {deck.cards.map((card, index) => (
          <CardPage card={card} index={index} cardCount={deck.cards.length} />
        ))}
        <SummaryPage index={deck.cards.length} />
      </ViewPager>
    </SafeAreaView>
  )
}

const CardPage = ({ card, index, cardCount }) => {
  const answerPress = () => {}
  const correctPress = () => {}
  const incorrectPress = () => {}

  return (
    <View collapsable={false} key={index} style={styles.pageContainer}>
      <Text>Question</Text>
      <Text>{card.question}</Text>
      <Button title="Show Answer" onPress={answerPress} />
      <Button title="Correct" onPress={correctPress} />
      <Button title="Incorrect" onPress={incorrectPress} />
      <Text>
        {index + 1}/{cardCount}
      </Text>
    </View>
  )
}

const SummaryPage = ({ index }) => {
  return (
    <View collapsable={false} key={index} style={styles.pageContainer}>
      <Text>Summary</Text>
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
