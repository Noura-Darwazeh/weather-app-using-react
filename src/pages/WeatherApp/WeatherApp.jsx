import React, { useState } from 'react'
import './WeatherApp.css'
import searchIcon from '../../assets/images/search.png'
import cloudIcon from '../../assets/images/cloud.png'
import windIcon from '../../assets/images/wind.png'
import humidityIcon from '../../assets/images/humidity.png'
const WeatherApp = () => {
  const api = {
    key: "1d1ab4eed251f3ba6391e89b52474da8",
    base: "https://api.openweathermap.org/data/2.5/"

  }
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPressed();
    }
  };

  const searchPressed = () => {
    console.log(search);
    fetch(`${api.base}weather?q=${search}&appid=${api.key}&&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
        console.log(weather)
        console.log(result)
      })

  }
  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='search-icon' onClick={searchPressed}>
          <img src={searchIcon} alt='search' />
        </button>
      </div>
      <div className='weather-image'>
        <img src={cloudIcon} alt='weather image' />
      </div>

      {typeof weather.main != "undefined" ? (
        <div>
          <div className='weather-description'>
            {weather.weather[0].description}
          </div>
          <div className='weather-temp'>

            {weather.main.temp}°c
          </div>
          <div className='weather-location'>
            {weather.name}
          </div>
          <div className='data-container'>

            <div className='element'>
              <img src={humidityIcon} alt='Humidity Icon' className='icon' />
              <div className='data'>
                <div className='humidity-percent'>{weather.main.humidity} %</div>
                <div className='text'>Humidity</div>
              </div>
            </div>

            <div className='element'>
              <img src={windIcon} alt='Wind Icon' className='icon' />
              <div className='data'>
                <div className='humidity-percent'>{weather.wind.speed} m/s</div>
                <div className='text'>Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='entry-par'>Please enter the city name</p>
      )}
    </div>
  )
}

export default WeatherApp
