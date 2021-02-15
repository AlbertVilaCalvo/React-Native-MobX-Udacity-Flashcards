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
import useDeckStore from '../decks/useDeckStore'
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
        <TouchableOpacity
          onPress={() => navigation.navigate('DeckDetail', { deckId: '1' })}>
          <Text>Open Deck Detail</Text>
        </TouchableOpacity>
        <FlatList
          data={decks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DeckListItem item={item} />}
          style={styles.deckList}
        />
      </SafeAreaView>
    </>
  )
})

export default HomeScreen

const DeckListItem = ({ item }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate('DeckDetail', { deckId: item.id })}
      style={styles.deckListItemContainer}>
      <Text style={styles.deckListItemText}>{item.name}</Text>
      <Text>{item.id}</Text>
    </Pressable>
  )
}

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
