import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import CustomButton from '../components/styled/CustomButton'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckList from '../components/DeckList'
import { TextBody } from '../components/styled/text'
import CustomSafeAreaView from '../components/CustomSafeAreaView'

const HomeScreen = observer(({ navigation }) => {
  const deckStore = useDeckStore()
  const decks = deckStore.decks

  if (decks.length === 0) {
    return (
      <CustomSafeAreaView style={sharedStyles.containerCentered}>
        <TextBody style={styles.noDecksText}>
          You don't have any deck yet.
        </TextBody>
        <CustomButton
          text="Create one!"
          onPress={() => navigation.navigate('NewDeck')}
        />
      </CustomSafeAreaView>
    )
  }

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text>Welcome</Text>
        </TouchableOpacity>
        <DeckList decks={decks} />
      </View>
    </CustomSafeAreaView>
  )
})

export default HomeScreen

const styles = StyleSheet.create({
  noDecksText: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
})
