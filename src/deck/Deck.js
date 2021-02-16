import { action, computed, makeObservable, observable } from 'mobx'

export default class Deck {
  id // string, immutable
  name // string, immutable
  cards = [] // Card[], mutable

  constructor(name) {
    this.id = randomId()
    this.name = name
    makeObservable(this, {
      cards: observable,
      cardCount: computed,
      cardCountFormatted: computed,
      addCard: action,
    })
  }

  get cardCount() {
    return this.cards.length
  }

  get cardCountFormatted() {
    return this.cards.length === 1 ? '1 card' : this.cards.length + ' cards'
  }

  addCard(card) {
    this.cards.push(card)
  }
}

// From https://stackoverflow.com/a/38872723/4034572
function randomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)
}
