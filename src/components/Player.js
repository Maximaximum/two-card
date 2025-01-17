import React from "react";
import Hand from "./Hand";

import "./Player.css";

/**
 * Shows player's hand, along with the player's name and information about the pairs in the hand.
 */
export default function Player({ hand, number }) {
  return (
    <div className="Player" key={hand.cards}>
      <h2 className="playerName">Player {number}:</h2>
      <Hand cards={hand.cards} colors={hand.colors} />
      <div className="pairs">
        (Pairs: {hand.colors.filter((c) => c !== undefined).length / 2})
      </div>
    </div>
  );
}
