import React from 'react'
import sharedStyles from '../styles/sharedStyles'
import CustomSafeAreaView from './CustomSafeAreaView'
import { TextBody } from './styled/text'

export default function DeckNotFound({ deckId }) {
  return (
    <CustomSafeAreaView style={sharedStyles.containerCenteredPaddingHorizontal}>
      <TextBody>Deck with id {deckId} does not exist.</TextBody>
    </CustomSafeAreaView>
  )
}
