import React, { useCallback, useRef } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'

const QuizViewPager = ({ deck }) => {
  const viewPager = useRef()

  const onReset = useCallback(() => {
    viewPager.current.setPage(0)
  }, [])

  return (
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

export default QuizViewPager

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
