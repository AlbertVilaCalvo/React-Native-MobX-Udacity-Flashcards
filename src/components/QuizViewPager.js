import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import CustomButton from './styled/CustomButton'
import { scheduleNotification } from '../utils/notification'
import { TextBody, TextHeading, TextTitle } from './styled/text'
import sharedStyles from '../styles/sharedStyles'

const ANSWER_CORRECT = 'correct'
const ANSWER_INCORRECT = 'incorrect'

const initialCardStates = (cardCount) =>
  Array(cardCount).fill({ showAnswer: false, answer: null })

const QuizViewPager = ({ deck }) => {
  const cardCount = deck.cards.length

  const [cardStates, setCardStates] = useState(initialCardStates(cardCount))

  const viewPager = useRef()
  const onReset = () => {
    viewPager.current.setPage(0)
    setCardStates(initialCardStates(cardCount))
  }

  const onShowAnswer = (index) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], showAnswer: true } : state,
      )
    })
  }

  const onSetAnswer = (index, answer) => {
    setCardStates((states) => {
      return states.map((state, i) =>
        i === index ? { ...states[index], answer } : state,
      )
    })
  }

  return (
    <ViewPager
      ref={viewPager}
      initialPage={0}
      style={styles.viewPager}
      showPageIndicator={true}>
      {deck.cards.map((card, index) => (
        <View style={styles.pageContainer} collapsable={false} key={index}>
          <TextBody>
            Question {index + 1}/{cardCount}
          </TextBody>
          <TextHeading>{card.question}</TextHeading>
          {cardStates[index].showAnswer ? (
            <TextHeading>{card.answer}</TextHeading>
          ) : (
            <CustomButton
              text="Show Answer"
              onPress={() => onShowAnswer(index)}
              style={styles.marginVertical}
            />
          )}
          {cardStates[index].answer === null ? (
            <>
              <CustomButton
                text="Correct"
                style={styles.marginVertical}
                onPress={() => onSetAnswer(index, ANSWER_CORRECT)}
              />
              <CustomButton
                text="Incorrect"
                onPress={() => onSetAnswer(index, ANSWER_INCORRECT)}
                style={styles.marginVertical}
              />
            </>
          ) : (
            <TextHeading>Your answer: {cardStates[index].answer}</TextHeading>
          )}
        </View>
      ))}

      <View
        style={styles.pageContainer}
        collapsable={false}
        key={deck.cards.length}>
        <SummaryPage onReset={onReset} cardStates={cardStates} />
      </View>
    </ViewPager>
  )
}

const SummaryPage = ({ cardStates, onReset }) => {
  const navigation = useNavigation()
  const [notificationScheduled, setNotificationScheduled] = useState(false)

  const backPress = () => {
    navigation.goBack()
  }

  const isDone = cardStates.every((state) => state.answer !== null)

  // When the user completes a deck we cancel the current notification for today
  // and we schedule a new one for the next day at the current time.
  if (isDone && !notificationScheduled) {
    setNotificationScheduled(true)
    scheduleNotification()
  }

  const totalAnswers = cardStates.length
  const correctAnswers = cardStates.reduce(
    (acc, state) => (state.answer === ANSWER_CORRECT ? acc + 1 : acc),
    0,
  )
  const incorrectAnswers = totalAnswers - correctAnswers

  return (
    <>
      <TextBody>Summary</TextBody>
      {isDone ? (
        <>
          <TextBody>Your score</TextBody>
          <TextHeading>
            Correct: {correctAnswers}/{totalAnswers}
          </TextHeading>
          <TextHeading>
            Incorrect: {incorrectAnswers}/{totalAnswers}
          </TextHeading>
        </>
      ) : (
        <TextHeading style={sharedStyles.textAlignCenter}>
          You have not answered all questions yet.
        </TextHeading>
      )}
      <CustomButton
        text="Restart Quiz"
        onPress={onReset}
        style={styles.marginVertical}
      />
      <CustomButton
        text="Back to Deck"
        onPress={backPress}
        style={styles.marginVertical}
      />
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
  marginVertical: {
    marginVertical: 5,
  },
  textQuestion: {
    marginVertical: 5,
  },
})
