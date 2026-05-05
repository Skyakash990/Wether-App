import React, { useEffect, useState } from "react";
import "./css/style.css";

const api_key = "618511fafaea39a099b8fb6d70b9b188";

const Weather = () => {
  const [searchTerm, setSearchTerm] = useState("botad");
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!searchTerm) return;

    try {
      setLoading(true);

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let d = new Date();
    setDate(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchData();
  };

  // 🌈 Dynamic background class
  const getWeatherClass = () => {
    if (!weather) return "default";

    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("rain")) return "rain";
    if (main.includes("cloud")) return "clouds";
    if (main.includes("clear")) return "clear";

    return "default";
  };

  return (
    <div className={`container ${getWeatherClass()}`}>
      <div className="card">
        <h1 className="title">Weather App</h1>

        <div className="search-box">
          <input
            id="inpt"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button onClick={fetchData} className="btn">
            🔍
          </button>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : weather ? (
          <>
            {/* 🌤 Dynamic icon from API */}
            <img
              id="wether"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather"
            />

            <div className="data">
              <h3>Temp: {weather.main.temp}°C</h3>
              <h3>Wind: {weather.wind.speed} km/h</h3>
              <h3>Humidity: {weather.main.humidity}%</h3>
              <h3>{date}</h3>
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
