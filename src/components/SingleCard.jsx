import "./SingleCard.css";
import React from "react";

const singleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card w-24 lg:w-32">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img className="back" onClick={handleClick} src="/img/cover.png" alt="card cover" />
      </div>
    </div>
  );
};

export default singleCard;
