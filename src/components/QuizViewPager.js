import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import CustomButton from './styled/CustomButton'
import { scheduleNotification } from '../utils/notification'
import { TextBody, TextHeading } from './styled/text'
import { Color } from '../styles/Color'

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
          <TextBody style={styles.topTitle}>
            Question {index + 1}/{cardCount}
          </TextBody>
          <View style={styles.middleContainer}>
            <TextHeading style={styles.textQuestion}>
              {card.question}
            </TextHeading>
            {cardStates[index].showAnswer ? (
              <TextHeading style={styles.textCenterMargin}>
                {card.answer}
              </TextHeading>
            ) : (
              <CustomButton
                text="Show Answer"
                onPress={() => onShowAnswer(index)}
              />
            )}
          </View>
          <View style={styles.bottomContainer}>
            {cardStates[index].answer === null ? (
              <>
                <CustomButton
                  text="Correct"
                  style={styles.bottomButton}
                  onPress={() => onSetAnswer(index, ANSWER_CORRECT)}
                />
                <CustomButton
                  text="Incorrect"
                  onPress={() => onSetAnswer(index, ANSWER_INCORRECT)}
                />
              </>
            ) : (
              <TextHeading>
                Your answer:{' '}
                <Text style={styles.textBold}>{cardStates[index].answer}</Text>
              </TextHeading>
            )}
          </View>
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
      <TextBody style={styles.topTitle}>Summary</TextBody>
      <View style={styles.middleContainer}>
        {isDone ? (
          <>
            <TextBody>Your score</TextBody>
            <TextHeading style={styles.textCorrect}>
              Correct:{' '}
              <Text style={styles.textBold}>
                {correctAnswers}/{totalAnswers}
              </Text>
            </TextHeading>
            <TextHeading>
              Incorrect:{' '}
              <Text style={styles.textBold}>
                {incorrectAnswers}/{totalAnswers}
              </Text>
            </TextHeading>
          </>
        ) : (
          <TextHeading style={styles.textCenterMargin}>
            You have not answered all questions yet.
          </TextHeading>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton
          text="Restart Quiz"
          onPress={onReset}
          style={styles.bottomButton}
        />
        <CustomButton text="Back to Deck" onPress={backPress} />
      </View>
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
  topTitle: {
    marginTop: 40,
    color: Color.primary,
    fontWeight: 'bold',
  },
  middleContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 4,
    alignItems: 'flex-start',
    marginBottom: 80,
  },
  bottomButton: {
    marginRight: 25,
  },
  textQuestion: {
    marginBottom: 30,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  textCenterMargin: {
    marginHorizontal: 30,
    textAlign: 'center',
  },
  textCorrect: {
    marginVertical: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
})
