import React, { useState } from 'react'
import { TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import CustomSafeAreaView from '../components/CustomSafeAreaView'

const NewDeckScreen = () => {
  const navigation = useNavigation()
  const deckStore = useDeckStore()
  const [input, setInput] = useState('')

  const onPress = () => {
    const newDeck = deckStore.addDeck(input)
    navigation.navigate('DeckDetail', { deckId: newDeck.id })
  }

  return (
    <CustomSafeAreaView style={sharedStyles.containerCenteredPaddingHorizontal}>
      <TextInput
        style={sharedStyles.textInput}
        placeholder="New Deck Name"
        onChangeText={(text) => setInput(text)}
        defaultValue={input}
      />
      <Button
        title="Create New Deck"
        disabled={input.trim() === ''}
        onPress={onPress}
      />
    </CustomSafeAreaView>
  )
}

export default NewDeckScreen
