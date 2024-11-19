// src/components/ClothesSection/ClothesSection.jsx

import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleAddClick,
  handleCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__button"
          aria-label="Add new clothing item"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="clothes-section__no-items">
            You have no clothing items yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
