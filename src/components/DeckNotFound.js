import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import sharedStyles from '../styles/sharedStyles'

export default function DeckNotFound({ deckId }) {
  return (
    <SafeAreaView
      style={[sharedStyles.containerCentered, sharedStyles.containerPadding]}>
      <Text style={sharedStyles.notFoundText}>
        Deck with id {deckId} does not exist.
      </Text>
    </SafeAreaView>
  )
}
