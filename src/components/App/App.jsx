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
import CurrentUserContext from "../../contexts/CurrentUserContext"; // Import CurrentUserContext
import EditProfileModal from "../EditProfileModal/EditProfileModal"; // Import EditProfileModal

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
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const openEditProfileModal = () => setIsEditProfileModalOpen(true);
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const navigate = useNavigate(); // For programmatic navigation

  /**
   * Handles adding a new clothing item.
   *
   * @param {object} values - The clothing item data.
   * @returns {Promise} - Resolves after the item is added.
   */
  const onAddItem = (values) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage

    return addItem(values, token)
      .then((createdItem) => {
        console.log("Created Item:", createdItem); // Debugging line
        setClothingItems((prevItems) => [createdItem, ...prevItems]);
        console.log("Updated Clothing Items State:", [
          createdItem,
          ...clothingItems,
        ]);
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        setError(error);
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
        closeModal(); // Close the modal after successful login
      })
      .catch((error) => {
        console.error("Login Error:", error);
        // Optionally, set error state to display error messages to the user
        throw error; // Re-throw to allow further handling if needed
      });
  };

  // Handler to update user profile
  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage

    return fetch("http://localhost:3001/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include JWT token in headers
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => Promise.reject(err));
        }
        return res.json();
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        console.log("Updated User:", updatedUser); // Debugging line
        return updatedUser;
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
  // src/components/App/App.jsx

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage
    if (!token) {
      console.error("No JWT token found. User might not be logged in.");
      return;
    }

    if (!isLiked) {
      // If the item is not liked, send a request to like it
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      // If the item is already liked, send a request to unlike it
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
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
    // Wrap the entire application with CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      {/* Provide current temperature unit and toggle function via CurrentTemperatureUnitContext */}
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTempUnit,
          handleToggleSwitchChange,
          isLoggedIn,
          currentUser,
        }}
      >
        <div className="page">
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
                      onUpdateProfile={handleUpdateProfile}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              {/* Add a catch-all route for 404 Not Found */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            <Footer />
          </div>
          {/* AddItemModal for adding new clothing items */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeModal}
            onAddItem={onAddItem}
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
            onSwitchToLogin={() => {
              closeRegisterModal();
              openLoginModal();
            }}
          />
          {/* LoginModal for user login */}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => {
              closeLoginModal();
              openRegisterModal();
            }}
          />
          {/* Display error messages if any */}
          {error && (
            <div className="error-popup">Something went wrong: {error}</div>
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
