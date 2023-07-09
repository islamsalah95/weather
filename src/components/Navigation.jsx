import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { fetchWeather } from '../redux/weather/action';
import { sevenDaysWeatherClicked } from '../redux/sevendaysweather/action';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CityContext from '../CityContext';

const Navigation = ({ weatherData, fetchWeather, sevenDaysWeatherData, sevenDaysWeatherClicked }) => {
  const { selectedCity, setSelectedCity } = useContext(CityContext);
  const navigate = useNavigate();

  function handleSelectChange(event) {
    setSelectedCity(event.target.value);
      fetchWeather(event.target.value);
  }


  // GET SEVEN DAYS WEATHER
  function seventDaysWeatherHandler(data) {
    sevenDaysWeatherClicked();
    fetchWeather(data);
    navigate(`/seven-days-weather/${selectedCity}`, { state: { selectedCity } });
  }

  function graphsHandler(data) {
    fetchWeather(data);
    navigate(`/map/${selectedCity}`, { state: { selectedCity } });
  }
  
  
  // WEATHER HOURLY UPDATE
  // IF THERE IS 'API' RESPOND, SUCCESS MESSAGE IS CALLED 
  // IF THERE IS NO 'API' RESPOND, ERROR MESSAGE IS CALLED 
  function weatherUpdateHourly(data){
    fetchWeather(data)
    if(weatherData){
      showSuccessMessage()
    }else{
      showErrorMessage()
    }
  }

 // RELOAD HOMEPAGE ON IF FORECAST ON HOUR BUTTON IS CLICKED
 function reloadHomepage(data){
  fetchWeather(data)
  navigate('/',);
}

  // SUCCESS MESSAGE
  const showSuccessMessage = () => {
    toast.success('تم تحديث الساعي ', {
        position: toast.POSITION.TOP_CENTER,
        className:'toast-style'
    });
};
  // ERROR MESSAGE
  const showErrorMessage = () => {
    toast.error('API لايوجد استجابة من  ', {
        position: toast.POSITION.TOP_CENTER,
        className:'toast-style'
    });
};
  return (
    <>
    <Navbar bg="light" expand="lg">
    <Container fluid>
    <Button className='bbttnn' type='button' variant='outline-info m-2' style={{fontWeight:'bold'}} onClick={()=>reloadHomepage(selectedCity)}>محطات الرصد الجوي</Button>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Button className='bbttnn' type='button' variant='outline-info m-2' style={{fontWeight:'bold',}} onClick={()=>seventDaysWeatherHandler(selectedCity)}>Forecast 3 days</Button>
          <Button className='bbttnn' type='button' variant='outline-info m-2' style={{fontWeight:'bold'}} onClick={()=>graphsHandler(selectedCity)}>Map</Button>
          <Button type='button' variant='outline-info m-2' className='arabic bbttnn' style={{fontWeight:'bold', paddingRight:40, paddingLeft:40}} onClick={()=>weatherUpdateHourly(selectedCity)}>تحديث المعلومات</Button>
                  
        </Nav>
        <Form className="d-flex">
        <Form.Select aria-label="Default select example"
             dir='rtl'
             className="me-2 pl-2 arabic"
             style={{fontWeight:'bold'}}
             size="lg" 
             value={selectedCity} 
             onChange={handleSelectChange}>       
                <option value="baghdad">بغداد</option>
                <option value="Samawah">السماوة</option>
                <option value="Al kut iraq">الكوت</option>
                <option value="Tekrit">صلاح الدين</option>
                <option value="An Nasiriya">الناصرية</option>
                <option value="Shamshamal">جمجمال</option>
                <option value="Kirkuk">كركوك</option>
                <option value="Arbil">اربيل</option>
                <option value="Sulaymaniyah">السليمانية</option>
                <option value="Zakho">زاخو</option>                       
                <option value="Basra iraq">البصرة</option>          
                <option value="Dahuk iraq">دهوك</option>                                  
                <option value="Amara iraq">العمارة</option>          
                <option value="Al faw">الفاو</option>          
                <option value="Najaf iraq">النجف</option>          
                <option value="Babil iraq">بابل</option>          
                <option value="Karbala">كربلاء</option>          
                <option value="Diwaniyah">الديوانية</option>          
                <option value="Ali Gharbi">علي الغربي</option>          
                <option value="Mosul iraq">الموصل</option>                            
                <option value="Al muthanna">المثنى</option>                   
           </Form.Select>
         <Button className='bbttnn' variant="outline-info m-2 arabic" style={{width:'12rem',fontSize:'1rem',fontWeight:'bold'}}>اسم المحطة</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  <ToastContainer />
  </>
  )
}
const mapStateToProps = (state) => ({
  weatherData: state.weather.data,
  sevenDaysWeatherData:state.sevenDaysWeather.data
});

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: (city) => dispatch(fetchWeather(city)),
  sevenDaysWeatherClicked:()=>dispatch(sevenDaysWeatherClicked())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

