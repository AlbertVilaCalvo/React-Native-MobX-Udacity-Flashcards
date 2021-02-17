import React from 'react'
import { SafeAreaView } from 'react-native'
import sharedStyles from '../styles/sharedStyles'
import { TextBody } from './styled/text'

export default function DeckNotFound({ deckId }) {
  return (
    <SafeAreaView
      style={[sharedStyles.containerCentered, sharedStyles.containerPadding]}>
      <TextBody>Deck with id {deckId} does not exist.</TextBody>
    </SafeAreaView>
  )
}
