import React, { useState } from 'react'
import { SafeAreaView, TextInput, StyleSheet, Button } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { useNavigation } from '@react-navigation/native'
import useDeckStore from '../decks/useDeckStore'

const NewDeckScreen = () => {
  const navigation = useNavigation()
  const deckStore = useDeckStore()
  const [input, setInput] = useState('')

  const onPress = () => {
    navigation.goBack()
    deckStore.addDeck(input)
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="New Deck Name"
          onChangeText={(text) => setInput(text)}
          defaultValue={input}
        />
        <Button
          title="Create New Deck"
          disabled={input.trim() === ''}
          onPress={onPress}
        />
      </SafeAreaView>
    </>
  )
}

export default NewDeckScreen

const styles = StyleSheet.create({
  container: { paddingHorizontal: 40, paddingVertical: 40 },
  textInput: { height: 40 },
})
