import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React from "react";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTempUnit } = React.useContext(CurrentTemperatureUnitContext);
  const defaultClothingItems = clothingItems || [];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTempUnit === "F"
            ? `${weatherData.temp.F} °F`
            : `${weatherData.temp.C} °C`}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
