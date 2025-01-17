import React from "react";
import Card from "./Card";

import './Hand.css';

/**
 * Shows the hand's cards (but not the additional info about the player)
 */
export default function Hand({ cards, colors }) {
  return (
    <div className="Hand">
      {cards.map((c, i) => (
        <Card
          key={c[0] + "_" + c[1]}
          suit={c[0]}
          value={c[1]}
          color={colors[i]}
        />
      ))}
    </div>
  );
}
