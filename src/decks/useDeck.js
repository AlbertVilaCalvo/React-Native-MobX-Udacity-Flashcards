import useDecks from './useDecks'

/**
 * @param id - the deck id
 * @returns {{name: string, id: string}|null} - the deck with the given id or
 * null if not found
 */
export default function useDeck(id) {
  const decks = useDecks()
  const deck = decks.find((d) => d.id === id)
  return deck ?? null
}
