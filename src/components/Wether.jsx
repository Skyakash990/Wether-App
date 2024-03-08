import React, { useState } from 'react';
import './css/style.css';
import icon from './icon.png';

let api_key = "618511fafaea39a099b8fb6d70b9b188";

const Weather = () => {
  const [searchTerm, setSearchTerm] = useState('botad');
  const [temperature, setTemperature] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');

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

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    fetchData(); // Trigger API call on input change
  };

  return (
    <div className='container'>
      <div className="card">
        <h1 className='title'>Weather App</h1>
        <div>
          <input
            id="inpt"
            className='city'
            placeholder='Search'
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <img id="wether" src={icon} alt="Weather Icon" />
          <h3 className='temp'>{temperature}</h3>
          <h3 className='wind-rate'>{wind}</h3>
          <h3 className='humidity'>{humidity}</h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;
