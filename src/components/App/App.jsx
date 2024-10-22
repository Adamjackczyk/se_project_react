// src/components/App/App.jsx

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal"; // Import RegisterModal
import LoginModal from "../LoginModal/LoginModal"; // Import LoginModal
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // Import ProtectedRoute
import {
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, getCurrentUser } from "../../utils/auth"; // Import signup and signin functions

function App() {
  // State variables for weather data and modals
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [error, setError] = useState(null);

  // Authentication-related state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const [currentUser, setCurrentUser] = useState(null); // Stores current user data
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Controls RegisterModal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Controls LoginModal visibility

  const navigate = useNavigate(); // For programmatic navigation

  let nextId =
    clothingItems.length > 0
      ? Math.max(...clothingItems.map((item) => item._id)) + 1
      : 0;

  /**
   * Handles adding a new clothing item.
   *
   * @param {object} values - The clothing item data.
   * @returns {Promise} - Resolves after the item is added.
   */
  const onAddItem = (values) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage
    const newItem = {
      ...values,
      _id: nextId++,
    };

    return addItem(newItem, token)
      .then((createdItem) => {
        setClothingItems((prevItems) => [createdItem, ...prevItems]);
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  /**
   * Handles deleting a clothing item by ID.
   *
   * @param {string} id - The ID of the clothing item to delete.
   */
  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        setError(error);
      });
  };

  /**
   * Handles clicking on a clothing card to view details.
   *
   * @param {object} card - The clothing item data.
   */
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  /**
   * Handles clicking the "Add" button to open the AddItemModal.
   */
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  /**
   * Toggles the temperature unit between Fahrenheit and Celsius.
   */
  const handleToggleSwitchChange = () => {
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  /**
   * Closes any open modal.
   */
  const closeModal = () => {
    setActiveModal("");
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
  };

  /**
   * Handles user registration.
   *
   * @param {object} data - The registration data.
   * @returns {Promise} - Resolves after successful registration and login.
   */
  const handleRegister = ({ name, avatar, email, password }) => {
    return signup(name, avatar, email, password)
      .then(() => {
        // Automatically log in the user after successful registration
        return handleLogin({ email, password });
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        // Optionally, set error state to display error messages to the user
        throw error; // Re-throw to allow further handling if needed
      });
  };

  /**
   * Handles user login.
   *
   * @param {object} data - The login data.
   * @returns {Promise} - Resolves after successful login.
   */
  const handleLogin = ({ email, password }) => {
    return signin(email, password)
      .then((res) => {
        // Store the JWT token in localStorage
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        // Fetch the current user's data
        return getCurrentUser(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Login Error:", error);
        // Optionally, set error state to display error messages to the user
        throw error; // Re-throw to allow further handling if needed
      });
  };

  /**
   * Checks for an existing JWT token in localStorage upon component mount.
   * If found, verifies its validity and fetches the current user's data.
   */
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // Verify the token and fetch user data
      getCurrentUser(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  /**
   * Handles liking or unliking a clothing item.
   *
   * @param {object} item - The clothing item data.
   */
  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage
    if (!token) {
      console.error("No JWT token found. User might not be logged in.");
      return;
    }

    if (!isLiked) {
      // If the item is not liked, send a request to like it
      addCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      // If the item is already liked, send a request to unlike it
      removeCardLike(_id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  /**
   * Logs out the current user by clearing the JWT token and resetting authentication state.
   */
  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Remove JWT token from localStorage
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/"); // Redirect to the main page
  };

  // Fetch weather data on component mount
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(error);
      });
  }, []);

  // Fetch clothing items on component mount
  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error);
      });
  }, []);

  return (
    <div className="page">
      {/* Provide current temperature unit and toggle function via context */}
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTempUnit,
          handleToggleSwitchChange,
          isLoggedIn,
          currentUser,
        }}
      >
        <div className="page__content">
          {/* Header with handlers for adding items and authentication modals */}
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            onRegister={() => setIsRegisterModalOpen(true)} // Open RegisterModal
            onLogin={() => setIsLoginModalOpen(true)} // Open LoginModal
          />
          <Routes>
            {/* Main Page Route */}
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike} // Pass like handler
                />
              }
            />
            {/* Protected Profile Page Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onCardLike={handleCardLike} // Pass like handler
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        {/* AddItemModal for adding new clothing items */}
        <AddItemModal
          {...{ closeModal, onAddItem, isOpen: activeModal === "add-garment" }}
        />
        {/* ItemModal for viewing item details */}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDelete={handleDeleteItem}
        />
        {/* RegisterModal for user registration */}
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeModal}
          onRegister={handleRegister}
        />
        {/* LoginModal for user login */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeModal}
          onLogin={handleLogin}
        />
        {/* Display error messages if any */}
        {error && (
          <div className="error-popup">Something went wrong: {error}</div>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
