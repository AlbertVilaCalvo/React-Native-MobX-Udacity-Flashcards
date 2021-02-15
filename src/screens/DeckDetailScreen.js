import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import useDeck from '../decks/useDeck'
import sharedStyles from '../styles/sharedStyles'

const DeckDetailScreen = ({ route, navigation }) => {
  const deckId = route.params.deckId
  const deck = useDeck(deckId)

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
    navigation.goBack()
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>Deck</Text>
        <Text>ID: {deckId}</Text>
        <TouchableOpacity onPress={deleteDeck}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

export default DeckDetailScreen
