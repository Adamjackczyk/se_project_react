import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = React.useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptionUrl;
  let weatherOptionCondition;

  if (filteredOptions.length === 0) {
    weatherOptionUrl =
      defaultWeatherOptions[weatherData.isDay ? "day" : "night"].url;
    weatherOptionCondition = defaultWeatherOptions.condition;
  } else {
    weatherOptionUrl = filteredOptions[0]?.url;
    weatherOptionCondition = filteredOptions[0]?.condition;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTempUnit === "F"
          ? `${weatherData.temp.F} °F`
          : `${weatherData.temp.C} °C`}
      </p>
      <img
        src={weatherOptionUrl}
        alt={`card showing ${weatherOptionCondition} weather at ${
          weatherData.isDay ? "day" : "night"
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
