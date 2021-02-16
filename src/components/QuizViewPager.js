import React, { useCallback, useRef, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'

const ANSWER_CORRECT = 'correct'
const ANSWER_INCORRECT = 'incorrect'

const QuizViewPager = ({ deck }) => {
  const viewPager = useRef()

  const onReset = useCallback(() => {
    viewPager.current.setPage(0)
  }, [])

  const [cardStates, setCardStates] = useState(
    Array(deck.cards.length).fill({ showAnswer: false, answer: null }),
  )

  const onShowAnswer = useCallback((index) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], showAnswer: true } : state,
      )
    })
  }, [])

  const onSetAnswer = useCallback((index, answer) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], answer } : state,
      )
    })
  }, [])

  return (
    <ViewPager
      ref={viewPager}
      initialPage={0}
      style={styles.viewPager}
      showPageIndicator={true}>
      {deck.cards.map((card, index) => (
        <View style={styles.pageContainer} collapsable={false} key={index}>
          <CardPage
            card={card}
            index={index}
            cardCount={deck.cards.length}
            showAnswer={cardStates[index].showAnswer}
            onShowAnswer={() => onShowAnswer(index)}
            onSetAnswerCorrect={() => onSetAnswer(index, ANSWER_CORRECT)}
            onSetAnswerIncorrect={() => onSetAnswer(index, ANSWER_INCORRECT)}
            answer={cardStates[index].answer}
          />
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

const CardPage = ({
  card,
  index,
  cardCount,
  showAnswer,
  onShowAnswer,
  onSetAnswerCorrect,
  onSetAnswerIncorrect,
  answer,
}) => {
  return (
    <>
      <Text>
        Question {index + 1}/{cardCount}
      </Text>
      <Text>{card.question}</Text>

      {showAnswer ? (
        <Text>{card.answer}</Text>
      ) : (
        <Button title="Show Answer" onPress={onShowAnswer} />
      )}

      {answer === null ? (
        <>
          <Button title="Correct" onPress={onSetAnswerCorrect} />
          <Button title="Incorrect" onPress={onSetAnswerIncorrect} />
        </>
      ) : (
        <Text>Your answer: {answer}</Text>
      )}
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
