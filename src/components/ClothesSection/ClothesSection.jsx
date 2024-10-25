// src/components/ClothesSection/ClothesSection.jsx

import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleAddClick, handleCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("Current User ID:", currentUser?._id); // Debugging line
  console.log("Clothing Items:", clothingItems); // Debugging line

  // Additional logging to inspect ownership
  clothingItems.forEach((item, index) => {
    console.log(
      `Item ${index + 1} Owner ID:`,
      item.owner ? item.owner._id : "No Owner"
    );
  });

  // Corrected filtering logic
  const userClothingItems = clothingItems.filter(
    (item) => item.owner && item.owner._id === currentUser._id
  );

  console.log("Filtered User Clothing Items:", userClothingItems);

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
