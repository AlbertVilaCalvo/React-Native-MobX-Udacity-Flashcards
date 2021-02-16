export class Card {
  question // string, immutable
  answer // string, immutable

  constructor(question, answer) {
    this.question = question
    this.answer = answer
  }
}
