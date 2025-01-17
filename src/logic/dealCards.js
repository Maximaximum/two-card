import Deck from "./deck";
import { colorGenerator } from "./colors";

/**
 * @typedef Hand
 * @type {object}
 * @property {string[][]} cards - array of cards in the hand.
 * @property {string[]} colors - specific colors to be used for specific card indices (if undefined, don't apply color).
 * @property {number} pairs - total number of pairs in hand.
 */

/**
 * Deal a specific number of cards to a specified number of hands (players), identify the number of pairs in each hand and assign colors to each of the cards that belong to pairs.
 * @param {number} handsNumber The number of hands to deal the cards to.
 * @param {number} cardsPerHand The number of cards to deal to each hand.
 *
 * @returns {Hand[]} Array of hands
 */
export function dealCards(handsNumber, cardsPerHand) {
  const deck = new Deck();
  const hands = [];
  // Conceptually it might make more sense to decouple the logic and deal the cards first, and only start identifying pairs afterwards.
  // But for this game we may do everything in just a single loop
  const cardsThatExist = [];
  const colorGenerators = [];

  // In real-life games, we draw cards by 1 for each player.
  // We emulate the same process here (might be useful if we want to add something like animations later).
  // A simpler approach would be to simply deal 7 cards to player 0, then deal 7 cards to player 1 etc.
  for (let cardI = 0; cardI < cardsPerHand; cardI++) {
    for (let handI = 0; handI < handsNumber; handI++) {
      if (hands[handI] === undefined) {
        hands[handI] = { cards: [], colors: [], pairs: 0 };
        cardsThatExist[handI] = new Map();
        colorGenerators[handI] = colorGenerator();
      }

      const hand = hands[handI];

      const newCard = deck.drawRandomCard();
      hand.cards.push(newCard);
      const [, newCardValue] = newCard;

      if (!cardsThatExist[handI].has(newCardValue)) {
        cardsThatExist[handI].set(newCardValue, cardI);
      } else {
        const color = colorGenerators[handI].next().value;
        hand.colors[cardsThatExist[handI].get(newCardValue)] = color;
        hand.colors[cardI] = color;
        hand.pairs++;
        cardsThatExist[handI].delete(newCardValue);
      }
    }
  }

  return hands;
}
