import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomButton from '../components/styled/CustomButton'

const NewDeckScreen = () => {
  const navigation = useNavigation()
  const deckStore = useDeckStore()
  const [deckName, setDeckName] = useState('')

  const onPress = () => {
    const newDeck = deckStore.addDeck(deckName)
    navigation.navigate('DeckDetail', { deckId: newDeck.id })
  }

  return (
    <CustomSafeAreaView style={sharedStyles.containerCenteredPaddingHorizontal}>
      <TextInput
        style={[sharedStyles.textInput, styles.input]}
        placeholder="New Deck Name"
        onChangeText={setDeckName}
        value={deckName}
      />
      <CustomButton
        text="Create New Deck"
        disabled={deckName.trim() === ''}
        onPress={onPress}
      />
    </CustomSafeAreaView>
  )
}

export default NewDeckScreen

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
})
