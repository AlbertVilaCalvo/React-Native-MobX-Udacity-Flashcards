import React from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import sharedStyles from '../styles/sharedStyles'

export default function DeckList({ decks }) {
  return (
    <FlatList
      data={decks}
      keyExtractor={(deck) => deck.id}
      renderItem={({ item }) => <DeckListItem deck={item} />}
      style={styles.deckList}
    />
  )
}

const DeckListItem = observer(({ deck }) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate('DeckDetail', { deckId: deck.id })}
      style={styles.deckListItemContainer}>
      <Text style={[sharedStyles.textLarge, styles.textName]}>{deck.name}</Text>
      <Text style={styles.textCount}>{deck.cardCountFormatted}</Text>
      <Text>{deck.id}</Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
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
  textName: {
    alignSelf: 'center',
    color: 'white',
  },
  textCount: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
})
