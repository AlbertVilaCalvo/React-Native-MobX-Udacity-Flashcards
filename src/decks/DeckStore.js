import { action, autorun, makeObservable, observable } from 'mobx'

class DeckStore {
  decks = []

  constructor() {
    makeObservable(this, {
      decks: observable,
      addDeck: action,
      removeDeck: action,
    })
    autorun(() => console.log(this.decks))
  }

  addDeck(name) {
    this.decks.push({
      id: randomId(),
      name,
    })
  }

  removeDeck(id) {
    const index = this.decks.findIndex((deck) => deck.id === id)
    if (index !== -1) {
      this.decks.splice(index, 1)
    }
  }

  getDeck(id) {
    return this.decks.find((d) => d.id === id) ?? null
  }
}

const deckStore = new DeckStore()

export default deckStore

// From https://stackoverflow.com/a/38872723/4034572
function randomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)
}
