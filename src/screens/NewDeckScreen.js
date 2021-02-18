import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomButton from '../components/styled/CustomButton'

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
      <CustomButton
        text="Create New Deck"
        disabled={input.trim() === ''}
        onPress={onPress}
      />
    </CustomSafeAreaView>
  )
}

export default NewDeckScreen
