import {
    SEVEN_DAYS_WEATHER_CLICKED,
  } from './action';
  
  const initialState = {
    sevenDaysWeather:false
  };
  
  const sevenDaysWeatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEVEN_DAYS_WEATHER_CLICKED:
        return {
          sevenDaysWeather:true
        };
      default:
        return state;
    }
  };
  
  export default sevenDaysWeatherReducer;