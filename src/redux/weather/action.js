// actions.js
import axios from 'axios';
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

// Trail
//const key = "17c4cc32ee1c4e2ea84211550231202";
// Trail 2
//const key = "6600675cfc5240729aa191454232702"


export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});


export const fetchWeather = (city) => {
    return (dispatch) => {
      dispatch(fetchWeatherRequest());
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=14`)
        .then(response => {
          console.log(response.data)
          const data = response.data;
          dispatch(fetchWeatherSuccess(data));
        })
        .catch(error => {
          dispatch(fetchWeatherFailure(error.message));
        });
    }
  }

