import React from 'react';
import { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import CityContext from '../CityContext';


function SevenDaysWeather() {
  const { selectedCity } = useContext(CityContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${selectedCity}&days=14`, {
        });

        setWeather(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const renderForecast = (day) => {
    if (!weather || !weather.forecast || !weather.forecast.forecastday) return null;

    return (
      <div className="container">
        <div className="row row-cols-5 d-flex justify-content-start">
          {weather.forecast.forecastday[day].hour.map((data) => (
            <div className="card me-2 mb-3" style={{ width: '12rem' }} key={(data.time.toString().split(' '))[1]}>
              <div className="card-content">
                <h3 className="card-title">{(data.time.toString().split(' '))[1]}</h3>
                <img src={data.condition.icon} alt="Weather Icon" />
                <p>{data.condition.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderButtons = (startIndex, endIndex) => {
    const buttons = [];
    for (let i = startIndex; i < endIndex; i++) {
      buttons.push(
        <button
          key={`day${i + 1}`}
          className="forcastBTN bbttnnn btn btn-outline-primary m-1"
          onClick={() => handleDaySelection(i)}
        >
          <strong>Forecast Day {i + 1}</strong>
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 d-flex flex-column mt-5 pt-5">
          {renderButtons(0, 3)}
        </div>
        <div className="col-md-10">
          <h1 className="text-center my-4 titleDayCity">
            {selectedCity} - {selectedDay !== null ? weather.forecast.forecastday[selectedDay].date : ''}
          </h1>
          {selectedDay !== null && renderForecast(selectedDay)}
        </div>
        {/*<div className="col-md-2 d-flex flex-column">*/}
        {/*  {renderButtons(7, 14)}*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default SevenDaysWeather;