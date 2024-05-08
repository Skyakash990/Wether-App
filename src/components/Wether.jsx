import React, { useEffect, useState } from "react";
import "./css/style.css";
import icon from "./icon.png";

const api_key = "618511fafaea39a099b8fb6d70b9b188";

const Weather = () => {
  const [searchTerm, setSearchTerm] = useState("botad");
  const [temperature, setTemperature] = useState("22");
  const [wind, setWind] = useState("18");
  const [humidity, setHumidity] = useState("10");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm === "") {
        return;
      }

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      setTemperature(`${data.main.temp}°C`);
      setWind(`${data.wind.speed} km/h`);
      setHumidity(`${data.main.humidity}%`);
    };

    fetchData();
  }, [searchTerm]); // This will trigger the effect whenever `searchTerm` changes

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let date1 = new Date();
    setDate(
      date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + date1.getFullYear()
    );
  }, []); // This will set the date when the component mounts

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Weather App</h1>
        <div>
          <input
            id="inpt"
            className="city"
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <img id="wether" src={icon} alt="Weather Icon" />
          <div className="data">
            <h3 className="temp">Temp:{temperature}</h3>
            <h3 className="wind-rate">Wind:{wind}</h3>
            <h3 className="humidity">Humidity:{humidity}</h3>
            <h3>Date:{date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
