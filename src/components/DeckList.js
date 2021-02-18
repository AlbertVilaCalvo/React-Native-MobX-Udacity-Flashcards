import React from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { TextBody, TextTitle } from './styled/text'
import { Color } from '../styles/Color'
import { Dimension } from '../styles/Dimension'

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
      style={({ pressed }) => [
        styles.deckListItemContainer,
        { backgroundColor: pressed ? Color.darkLight : Color.dark },
      ]}>
      <TextTitle style={styles.textName}>{deck.name}</TextTitle>
      <TextBody style={styles.textCount}>{deck.cardCountFormatted}</TextBody>
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
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: Dimension.borderRadius,
  },
  textName: {
    alignSelf: 'center',
    color: 'white',
  },
  textCount: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 10,
  },
})
