import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={sunny} alt={weatherData.type} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
