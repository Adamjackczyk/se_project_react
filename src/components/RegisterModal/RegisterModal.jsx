// src/components/RegisterModal/RegisterModal.jsx

import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

/**
 * RegisterModal Component
 *
 * Renders a modal form for user registration.
 *
 * Props:
 * - isOpen (boolean): Determines if the modal is open.
 * - onClose (function): Function to close the modal.
 * - onRegister (function): Function to handle user registration.
 */
const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  // State variables to manage form inputs
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handlers to update state based on user input
  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  /**
   * Handles form submission for user registration.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Pass the form data to the onRegister function
    onRegister({ name, avatar, email, password })
      .then(() => {
        // Clear form fields upon successful registration
        setName("");
        setAvatar("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        // Handle registration errors (e.g., display error messages)
      });
  };

  /**
   * Validates the form to ensure all fields are filled.
   *
   * @returns {boolean} - True if the form is valid, else false.
   */
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      avatar.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      {/* Email Input Field */}
      <label className="modal__label" htmlFor="register-email">
        Email*
        <input
          type="email"
          id="register-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>

      {/* Password Input Field */}
      <label className="modal__label" htmlFor="register-password">
        Password*
        <input
          type="password"
          id="register-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      {/* Name Input Field */}
      <label className="modal__label" htmlFor="register-name">
        Name *
        <input
          type="text"
          id="register-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      {/* Avatar URL Input Field */}
      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL *
        <input
          type="url"
          id="register-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <p className="signup__or-login">or Log In</p>
    </ModalWithForm>
  );
};

export default RegisterModal;
