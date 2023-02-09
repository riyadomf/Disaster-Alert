import "./current-weather.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CurrentWeather = ({ data }) => {
  data.city = data.city.replace(", ", "-");
  data.city = data.city.replace(/\s+/g, "-");
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data?.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div className="subscribe-button">
        <Link
          to={`/alert-subscription?city=${data.city}&lat=${data.lat}&lon=${data.lon}`}
        >
          <Button className="info">Alert Subscription</Button>
        </Link>
      </div>
    </div>
  );
};
export default CurrentWeather;
