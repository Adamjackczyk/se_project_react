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
import { getItems, deleteItem, addItem } from "../../utils/api";

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
  const [error, setError] = useState(null);

  let nextId =
    clothingItems.length > 0
      ? Math.max(...clothingItems.map((item) => item._id)) + 1
      : 0;

  const onAddItem = (values) => {
    const newItem = {
      ...values,
      _id: nextId++,
    };

    return addItem(newItem).then((createdItem) => {
      setClothingItems((prevItems) => [createdItem, ...prevItems]);
      closeModal();
    });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
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
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(error);
      });
  }, []);

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
        {error && (
          <div className="error-popup">Something went wrong: {error}</div>
        )}{" "}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
