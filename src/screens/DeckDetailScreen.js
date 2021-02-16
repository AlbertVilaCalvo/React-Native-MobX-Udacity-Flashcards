import React, { useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckNotFound from '../components/DeckNotFound'

const DeckDetailScreen = observer(({ route, navigation }) => {
  const deckStore = useDeckStore()
  const deckId = route.params.deckId
  const deck = deckStore.getDeck(deckId)

  useEffect(() => {
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
    <>
      <CustomStatusBar />
      <SafeAreaView
        style={[
          sharedStyles.containerPadding,
          sharedStyles.containerCenteredVertical,
        ]}>
        <Text style={sharedStyles.textLarge}>{deck.name}</Text>
        <Text style={styles.bottomMargin}>ID: {deckId}</Text>
        <Text style={styles.bottomMargin}>{deck.cardCountFormatted}</Text>
        <Button
          title="Add Card"
          onPress={() => navigation.navigate('NewCard', { deckId })}
        />
        <Button
          title="Start Quiz"
          onPress={() => navigation.navigate('Quiz', { deckId })}
          disabled={deck.cardCount === 0}
        />
        <TouchableOpacity onPress={deleteDeck}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
})

export default DeckDetailScreen

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: 20,
  },
})
