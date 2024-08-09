import sunny from "../../assets/sunny.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={sunny} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
