import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import useDeck from '../decks/useDeck'

const DeckDetailScreen = ({ route, navigation }) => {
  const deckId = route.params.deckId
  const deck = useDeck(deckId)

  useEffect(() => {
    if (deck !== null) {
      navigation.setOptions({ title: deck.name })
    }
  }, [deck, navigation])

  if (deck == null) {
    return <Text>Deck with id {deckId} does not exist.</Text>
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
