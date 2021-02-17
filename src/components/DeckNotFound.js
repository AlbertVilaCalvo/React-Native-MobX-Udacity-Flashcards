import React from 'react'
import { View } from 'react-native'
import sharedStyles from '../styles/sharedStyles'
import { TextBody } from './styled/text'

export default function DeckNotFound({ deckId }) {
  return (
    <View
      style={[sharedStyles.containerCentered, sharedStyles.containerPadding]}>
      <TextBody>Deck with id {deckId} does not exist.</TextBody>
    </View>
  )
}
