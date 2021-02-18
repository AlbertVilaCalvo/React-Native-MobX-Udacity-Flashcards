import React, { useLayoutEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckNotFound from '../components/DeckNotFound'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { TextTitle } from '../components/styled/text'
import CustomButton from '../components/styled/CustomButton'

const DeckDetailScreen = observer(({ route, navigation }) => {
  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  useLayoutEffect(() => {
    if (deck !== null) {
      navigation.setOptions({ title: deck.name })
    }
  }, [deck, navigation])

  if (deck === null) {
    return <DeckNotFound deckId={deckId} />
  }

  const deleteDeck = () => {
    deckStore.removeDeck(deckId)
    navigation.goBack()
  }

  return (
    <CustomSafeAreaView
      style={sharedStyles.containerCenterVerticalPaddingHorizontal}>
      <TextTitle>{deck.name}</TextTitle>
      <Text style={styles.bottomMargin}>ID: {deckId}</Text>
      <Text style={styles.bottomMargin}>{deck.cardCountFormatted}</Text>
      <CustomButton
        text="Add Card"
        onPress={() => navigation.navigate('NewCard', { deckId })}
        style={styles.bottomMargin}
      />
      <CustomButton
        text="Start Quiz"
        onPress={() => navigation.navigate('Quiz', { deckId })}
        disabled={deck.cardCount === 0}
        style={styles.bottomMargin}
      />
      <TouchableOpacity onPress={deleteDeck}>
        <Text>Delete Deck</Text>
      </TouchableOpacity>
    </CustomSafeAreaView>
  )
})

export default DeckDetailScreen

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: 20,
  },
})
