import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import weatherReducer from './weather/reducer'
import sevenDaysWeatherReducer from './sevendaysweather/reducer';

const reducer = {
    weather:weatherReducer,
    sevenDaysWeather:sevenDaysWeatherReducer
}
const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().concat(logger)
})
export default store