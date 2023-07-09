import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
  } from './action';
  
  const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_WEATHER_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_WEATHER_FAILURE:
        return {
          ...state,
          data: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default weatherReducer;