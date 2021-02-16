import { action, autorun, makeObservable, observable } from 'mobx'
import Deck from './Deck'

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
    const newDeck = new Deck(name)
    this.decks.push(newDeck)
    return newDeck
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
