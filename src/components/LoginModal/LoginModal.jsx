// src/components/LoginModal/LoginModal.jsx

import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

/**
 * LoginModal Component
 *
 * Renders a modal form for user authorization.
 *
 * Props:
 * - isOpen (boolean): Determines if the modal is open.
 * - onClose (function): Function to close the modal.
 * - onLogin (function): Function to handle user login.
 */
const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  // State variables to manage form inputs
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handlers to update state based on user input
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  /**
   * Handles form submission for user login.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Pass the form data to the onLogin function
    onLogin({ email, password })
      .then(() => {
        // Clear form fields upon successful login
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Login Error:", error);
        // Handle login errors (e.g., display error messages)
      });
  };

  /**
   * Validates the form to ensure all fields are filled.
   *
   * @returns {boolean} - True if the form is valid, else false.
   */
  const isFormValid = () => {
    return email.trim() !== "" && password.trim() !== "";
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      {/* Email Input Field */}
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          type="email"
          id="login-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>

      {/* Password Input Field */}
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          type="password"
          id="login-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      {/* Toggle Button to Switch to Register Modal */}
      <button
        type="button"
        className="modal__toggle-button"
        onClick={() => {
          onClose();
          onSwitchToRegister();
        }}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
