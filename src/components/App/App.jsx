import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import { getItems } from "../../utils/API";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const onAddItem = (values) => {
    const newItem = {
      ...values,
      _id:
        clothingItems.length > 0
          ? clothingItems[clothingItems.length - 1]._id + 1
          : 0,
    };

    return fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((createdItem) => {
        setClothingItems((prevItems) => [...prevItems, createdItem]);
        closeModal();
      });
  };
  const handleDeleteItem = (id) => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== id)
          );
          closeModal();
        }
      })
      .catch(console.error);
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "F") setCurrentTempUnit("C");
    if (currentTempUnit === "C") setCurrentTempUnit("F");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          {...{ closeModal, onAddItem, isOpen: activeModal === "add-garment" }}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDelete={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
