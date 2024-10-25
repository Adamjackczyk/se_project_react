// src/components/ItemCard/ItemCard.jsx

import "./ItemCard.css";
import likedIcon from "../../assets/liked.svg";
import unlikedIcon from "../../assets/unliked.svg";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user has liked the item
  const isLiked = item.likes.some((user) => user._id === currentUser?._id);

  // Determine which like icon to show
  const likeIcon = isLiked ? likedIcon : unlikedIcon;

  // Like button class
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : "card__like-button_unliked"
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClickInternal = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClickInternal}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        className={likeButtonClassName}
        onClick={handleLike}
        aria-label={isLiked ? "Unlike this item" : "Like this item"}
      >
        <img src={likeIcon} alt={isLiked ? "Liked" : "Not liked"} />
      </button>
    </li>
  );
}

export default ItemCard;
