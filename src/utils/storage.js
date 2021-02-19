import AsyncStorage from '@react-native-async-storage/async-storage'

const DECKS_KEY = 'flashcards-decks'

export async function persistDecks(decks) {
  console.log('persistDecks()', decks)
  try {
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
  } catch (e) {
    console.error('Error persisting decks in persistDecks()', e)
  }
}

export async function retrievePersistedDecks() {
  try {
    const decksJSON = await AsyncStorage.getItem(DECKS_KEY)
    console.log('retrievePersistedDecks() decksJSON', decksJSON)
    const persistedDecks = decksJSON != null ? JSON.parse(decksJSON) : null
    console.log('retrievePersistedDecks() persistedDecks', persistedDecks)
    return persistedDecks
  } catch (e) {
    console.error('Error retrieving decks in retrievePersistedDecks()', e)
  }
}
