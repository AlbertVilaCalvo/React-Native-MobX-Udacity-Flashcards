import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import useDeckStore from '../deck/useDeckStore'
import sharedStyles from '../styles/sharedStyles'

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
        <FlatList
          data={decks}
          keyExtractor={(deck) => deck.id}
          renderItem={({ item }) => <DeckListItem deck={item} />}
          style={styles.deckList}
        />
      </SafeAreaView>
    </>
  )
})

export default HomeScreen

const DeckListItem = observer(({ deck }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate('DeckDetail', { deckId: deck.id })}
      style={styles.deckListItemContainer}>
      <Text style={styles.deckListItemText}>{deck.name}</Text>
      <Text>{deck.cardCountFormatted}</Text>
      <Text>{deck.id}</Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  noDecksText: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
  deckList: {
    flex: 1,
  },
  deckListItemContainer: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'darkslategray',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 4,
  },
  deckListItemText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 26,
  },
})
