import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../redux/weather/action';
import OneDayWeather from './OneDayWeather';

const WeatherForecast = ({ weatherData, fetchWeather }) => {
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="weather-forecast">
      <div className="weather-cards">
        <OneDayWeather weather={weatherData} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  weatherData: state.weather.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: () => dispatch(fetchWeather("Baghdad"))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);