export default class Deck {
  id // string, immutable
  name // string

  constructor(name) {
    this.id = randomId()
    this.name = name
  }
}

// From https://stackoverflow.com/a/38872723/4034572
function randomId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10)
}
