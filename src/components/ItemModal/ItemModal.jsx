// src/components/ItemModal/ItemModal.jsx

import React, { useContext } from "react";
import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

/**
 * ItemModal Component
 *
 * Renders a modal displaying detailed information about a clothing item.
 *
 * Props:
 * - activeModal (string): Identifier for the active modal.
 * - card (object): The clothing item data.
 * - onClose (function): Function to close the modal.
 * - onDelete (function): Function to delete the item.
 */
function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (activeModal !== "preview" || !card) {
    return null;
  }

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === (currentUser ? currentUser._id : null);

  // Creating a variable which you'll then set in className for the delete button
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close" type="button">
          <img
            className="modal__close-button"
            src={closeButton}
            alt="Close button"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-left">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {/* Delete Button */}
          <button
            className={itemDeleteButtonClassName}
            onClick={() => onDelete(card._id)}
            aria-label="Delete this item"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
