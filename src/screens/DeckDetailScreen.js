import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'

const DeckDetailScreen = observer(({ route, navigation }) => {
  const deckId = route.params.deckId
  const deckStore = useDeckStore()
  const deck = deckStore.getDeck(deckId)

  useEffect(() => {
    if (deck !== null) {
      navigation.setOptions({ title: deck.name })
    }
  }, [deck, navigation])

  if (deck == null) {
    return (
      <SafeAreaView style={sharedStyles.containerCentered}>
        <Text style={sharedStyles.notFoundText}>
          Deck with id {deckId} does not exist.
        </Text>
      </SafeAreaView>
    )
  }

  const deleteDeck = () => {
    deckStore.removeDeck(deckId)
    navigation.goBack()
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>ID: {deckId}</Text>
        <TouchableOpacity onPress={deleteDeck}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
})

export default DeckDetailScreen
