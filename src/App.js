import React,{useState}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navigation  from './components/Navigation';
import WeatherForecast from './components/WeatherForecast';
import Graphs from './components/Map';
import SevenDaysWeather from './components/SevenDaysWeather';
import { Provider } from 'react-redux';
import store from './redux/store';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityContext from './CityContext';
import SoilConditionsMap from './components/SoilConditionsMap';


function App() {
  const [selectedCity, setSelectedCity] = useState('baghdad');
  return (
    <Provider store={store}>
      <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route index element={<WeatherForecast />} />
            <Route path="/seven-days-weather/:city" element={<SevenDaysWeather />} />
            <Route path="/map/:city" element={<Graphs />} />
            <Route path="/soil/" element={<SoilConditionsMap />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      </CityContext.Provider>
    </Provider>
  );
}

export default App;
