import React, { useState } from 'react'
import { TextInput, Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'

const NewDeckScreen = () => {
  const navigation = useNavigation()
  const deckStore = useDeckStore()
  const [input, setInput] = useState('')

  const onPress = () => {
    const newDeck = deckStore.addDeck(input)
    navigation.navigate('DeckDetail', { deckId: newDeck.id })
  }

  return (
    <View style={sharedStyles.containerPadding}>
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
    </View>
  )
}

export default NewDeckScreen
