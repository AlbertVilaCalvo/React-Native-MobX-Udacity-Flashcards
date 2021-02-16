import React, { useCallback, useEffect, useRef } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import useDeckStore from '../deck/useDeckStore'
import DeckNotFound from '../components/DeckNotFound'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'

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

  const viewPager = useRef()

  const onReset = useCallback(() => {
    viewPager.current.setPage(0)
  }, [])

  if (deck === null) {
    return <DeckNotFound deckId={deckId} />
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Quiz</Text>
      <ViewPager
        ref={viewPager}
        initialPage={0}
        style={styles.viewPager}
        showPageIndicator={true}>
        {deck.cards.map((card, index) => (
          <View style={styles.pageContainer} collapsable={false} key={index}>
            <CardPage card={card} index={index} cardCount={deck.cards.length} />
          </View>
        ))}
        <View
          style={styles.pageContainer}
          collapsable={false}
          key={deck.cards.length}>
          <SummaryPage onReset={onReset} />
        </View>
      </ViewPager>
    </SafeAreaView>
  )
}

const CardPage = ({ card, index, cardCount }) => {
  const answerPress = () => {}
  const correctPress = () => {}
  const incorrectPress = () => {}

  return (
    <>
      <Text>
        Question {index + 1}/{cardCount}
      </Text>
      <Text>{card.question}</Text>
      <Button title="Show Answer" onPress={answerPress} />
      <Button title="Correct" onPress={correctPress} />
      <Button title="Incorrect" onPress={incorrectPress} />
    </>
  )
}

const SummaryPage = ({ onReset }) => {
  const navigation = useNavigation()

  const backPress = () => {
    navigation.goBack()
  }

  return (
    <>
      <Text>Summary</Text>
      <Button title="Restart Quiz" onPress={onReset} />
      <Button title="Back to Deck" onPress={backPress} />
    </>
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
