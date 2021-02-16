// From https://stackoverflow.com/a/38872723/4034572
function randomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)
}

const DECKS = [
  {
    id: randomId(),
    name: 'JavaScript',
  },
  {
    id: randomId(),
    name: 'React',
  },
]

/**
 * @returns {[{name: string, id: string}]} - all the available decks
 */
export default function useDecks() {
  return DECKS
}
