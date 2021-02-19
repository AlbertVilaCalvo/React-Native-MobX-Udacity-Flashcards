import { action, autorun, makeObservable, observable, runInAction } from 'mobx'
import Deck from './Deck'
import { persistDecks, retrievePersistedDecks } from '../utils/storage'
import { Card } from './Card'

class DeckStore {
  decks = []
  decksInitialized = false

  constructor() {
    makeObservable(this, {
      decks: observable,
      addDeck: action,
      removeDeck: action,
    })

    autorun(() => {
      console.log('decks updated:', JSON.stringify(this.decks))
      // When the app starts autorun() immediately executes with this.decks
      // being []. We need to wait till we've initialized this.decks with the
      // persisted decks before calling persistDecks(), otherwise we loose the
      // persisted decks.
      if (!this.decksInitialized) {
        return
      }
      persistDecks(this.decks)
    })

    retrievePersistedDecks()
      .then((persistedDecks) => {
        if (persistedDecks != null) {
          runInAction(() => {
            persistedDecks.forEach((deck) => {
              const cards = deck.cards.map(
                (card) => new Card(card.question, card.answer),
              )
              this.decks.push(new Deck(deck.name, deck.id, cards))
            })
          })
        }
      })
      .finally(() => {
        this.decksInitialized = true
      })
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
