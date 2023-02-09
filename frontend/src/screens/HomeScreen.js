import React from "react";
import Search from "../components/search/search.js";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../api";
import CurrentWeather from "../components/current-weather/current-weather";

const HomeScreen = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setLat(lat);
    setLon(lon);
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}weather?` +
        `lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?` +
        `lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather data={{ ...currentWeather, lat, lon }} />
      )}
    </div>
  );
};

export default HomeScreen;
