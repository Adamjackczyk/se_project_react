// src/components/ItemCard/ItemCard.jsx

import "./ItemCard.css";
import likedIcon from "../../assets/liked.svg";
import unlikedIcon from "../../assets/unliked.svg";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

/**
 * ItemCard Component
 *
 * Renders a card displaying a clothing item with like functionality.
 *
 * Props:
 * - item (object): The clothing item data.
 * - onCardClick (function): Function to handle clicking on the item image.
 * - onCardLike (function): Function to handle liking/unliking the item.
 */
function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Determine if the current user has liked the item
  const isLiked = currentUser
    ? item.likes.some((userId) => userId === currentUser._id)
    : false;

  // Determine which like icon to show
  const likeIconSrc = isLiked ? likedIcon : unlikedIcon;

  // Like button CSS class based on like state
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : "card__like-button_unliked"
  }`;

  /**
   * Handles the like/unlike action.
   */
  const handleLikeClick = () => {
    if (currentUser) {
      onCardLike({ id: item._id, isLiked });
    } else {
      // Optionally, you can prompt the user to log in
      console.warn("User is not logged in. Cannot like items.");
    }
  };

  /**
   * Handles clicking on the item image to view details.
   */
  const handleImageClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      {/* Card Header: Item Name and Like Button */}
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {/* Conditionally render the like button only if the user is logged in */}
        {currentUser && (
          <button
            className={likeButtonClassName}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike this item" : "Like this item"}
          >
            <img src={likeIconSrc} alt={isLiked ? "Liked" : "Not liked"} />
          </button>
        )}
      </div>

      {/* Item Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleImageClick}
      />
    </li>
  );
}

export default ItemCard;
