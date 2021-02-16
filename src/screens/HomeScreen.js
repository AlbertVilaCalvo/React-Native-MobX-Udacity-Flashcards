import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'
import DeckList from '../components/DeckList'

const HomeScreen = observer(({ navigation }) => {
  const deckStore = useDeckStore()
  const decks = deckStore.decks

  if (decks.length === 0) {
    return (
      <SafeAreaView style={sharedStyles.containerCentered}>
        <Text style={[sharedStyles.notFoundText, styles.noDecksText]}>
          You don't have any decks yet.
        </Text>
        <Button
          title="Create one!"
          onPress={() => navigation.navigate('NewDeck')}
        />
      </SafeAreaView>
    )
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text>Welcome</Text>
        </TouchableOpacity>
        <DeckList decks={decks} />
      </SafeAreaView>
    </>
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
