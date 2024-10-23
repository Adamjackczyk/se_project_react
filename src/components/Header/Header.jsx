// src/components/Header/Header.jsx

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

/**
 * Header Component
 *
 * Renders the application's header with navigation and authentication controls.
 *
 * Props:
 * - handleAddClick (function): Function to open the AddItemModal.
 * - weatherData (object): Data about the current weather.
 * - onRegister (function): Function to open the RegisterModal.
 * - onLogin (function): Function to open the LoginModal.
 */
function Header({ handleAddClick, weatherData, onRegister, onLogin }) {
  // Consume currentUser from CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  // Consume isLoggedIn from CurrentTemperatureUnitContext
  const { isLoggedIn } = useContext(CurrentTemperatureUnitContext);

  // Determine user's name and avatar
  const name = currentUser ? currentUser.name : "Guest";
  const userAvatar =
    currentUser && currentUser.avatar ? currentUser.avatar : avatarPlaceholder;

  // Extract the first letter of the user's name for the avatar placeholder
  const avatarInitial = name.charAt(0).toUpperCase();

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {!isLoggedIn && (
          <>
            <button
              onClick={onRegister}
              type="button"
              className="header__signup-btn"
            >
              Sign up
            </button>
            <button
              onClick={onLogin}
              type="button"
              className="header__signin-btn"
            >
              Log in
            </button>
          </>
        )}
        {isLoggedIn && (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
              aria-label="Add a new clothing item"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__profile-link">
              <div className="header__user-container">
                <p className="header__username">{name}</p>
                {/* User Avatar */}
                {currentUser && currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${name}'s avatar`}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {avatarInitial}
                  </div>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
