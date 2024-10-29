// src/components/EditProfileModal/EditProfileModal.jsx

import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./EditProfileModal.css";

/**
 * EditProfileModal Component
 *
 * Renders a modal form for editing user profile information.
 *
 * Props:
 * - isOpen (boolean): Determines if the modal is open.
 * - onClose (function): Function to close the modal.
 */
const EditProfileModal = ({ isOpen, onClose, onUpdateProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  // State variables to manage form inputs
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Populate form fields with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  // Handlers to update state based on user input
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  /**
   * Handles form submission for editing profile.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the data to send
    const updatedData = {
      name,
      avatar,
    };

    // Make the API call to update user profile via the passed handler
    onUpdateProfile(updatedData)
      .then((updatedUser) => {
        // Clear form fields (optional)
        setName("");
        setAvatar("");

        // Close the modal
        onClose();
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Optionally, handle errors (e.g., display error messages)
      });
  };

  /**
   * Validates the form to ensure all fields are filled.
   *
   * @returns {boolean} - True if the form is valid, else false.
   */
  const isFormValid = () => {
    return name.trim() !== "" && avatar.trim() !== "";
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      {/* Name Input Field */}
      <label className="modal__label" htmlFor="edit-profile-name">
        Name *
        <input
          type="text"
          id="edit-profile-name"
          name="name"
          className="modal__input"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      {/* Avatar URL Input Field */}
      <label className="modal__label" htmlFor="edit-profile-avatar">
        Avatar *
        <input
          type="url"
          id="edit-profile-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
