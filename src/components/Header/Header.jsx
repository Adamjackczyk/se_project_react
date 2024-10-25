// src/components/Header/Header.jsx

import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Header({ handleAddClick, weatherData, onRegister, onLogin }) {
  const currentUser = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(CurrentTemperatureUnitContext);

  const name = currentUser ? currentUser.name : "Guest";
  const userAvatar =
    currentUser && currentUser.avatar ? currentUser.avatar : avatarPlaceholder;
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
