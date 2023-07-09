import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CityContext from '../CityContext';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label,
} from 'recharts';

export default function Graphs() {
    const { selectedCity } = useContext(CityContext);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${selectedCity}&days=14`,
                    {
                        params: {
                            // Add your API parameters here
                        },
                    }
                );

                setWeather(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

    if (isLoading) {
        return <div style={{marginTop: 50, fontSize:30}}>Loading...</div>;
    }

    const boldStyle = {
        fontWeight: 'bold',
    };

    const data = [];

    if (weather.forecast.forecastday) {
        weather.forecast.forecastday[0].hour.forEach((hourData) => {
            const time = new Date(hourData.time);
            time.setHours(0, 0, 0)
            if (time.getMonth() <= 5 || (time.getMonth() >= 10 && time.getDay() >= 1))
                data.push({
                    SeaLevel: selectedCity === "Baghdad" ? hourData.pressure_mb - 4.2 : hourData.pressure_mb,
                    windSpeed: Math.round(hourData.wind_mph),
                });
            else
                data.push({
                    SeaLevel: selectedCity === "Baghdad" ? hourData.pressure_mb - 4.2 : hourData.pressure_mb,
                    windSpeed: Math.round(hourData.wind_mph),
                });
        });
    }

    const data1 = [];

    if (weather.forecast.forecastday) {
        weather.forecast.forecastday[0].hour.forEach((hourData) => {
            data1.push({
                time: hourData.time.toString().split(' ')[1].slice(0, 2),
                windSpeed: Math.round(hourData.wind_mph),
            });
        });
    }

    const data2 = [];

    if (weather.forecast.forecastday) {
        for(let i = 0 ; i < 14 ; i++ ){

            data2.push({
                time: weather.forecast.forecastday[i].date,
                Maximun: weather.forecast.forecastday[i].day.maxtemp_c.toFixed(1) - 2
            });
        }

    }

    const data3 = [];

    if (weather.forecast.forecastday) {
        for(let i = 0 ; i < 14 ; i++ ){

            data3.push({
                time: weather.forecast.forecastday[i].date,
                Minimun:   ((weather.forecast.forecastday[i].day.mintemp_c).toFixed(0) - 2)
            });
        }

    }





    return (
        <>
            <div className='graph-container'>
                {/* First Graph */}
                <LineChart
                    width={1000}
                    height={400}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}

                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" style={boldStyle}/>
                    <XAxis dataKey="SeaLevel" stroke="#000" style={boldStyle}>
                        <Label value="Sea Level Pressure (mb)" offset={-5} position="insideBottom" fill="#000" style={boldStyle} />
                    </XAxis>
                    <YAxis
                        style={boldStyle}
                        domain={[0, 40]}
                        tickCount={8}
                        stroke="#000"
                    >
                        <Label
                            style={boldStyle}
                            value="Wind Speed KT"
                            angle={-90}
                            position="insideLeft"
                            offset={10}
                            fill="#000"
                        />
                    </YAxis>
                    {/*<Tooltip />*/}
                    <Line
                        type="monotone"
                        dataKey="windSpeed"
                        stroke="#ff0000"
                        activeDot={{ r: 8 }}
                        style={boldStyle}
                    />
                </LineChart>
            </div>
            <div className='graph-container'>
                {/* Second Graph */}
                <LineChart
                    width={1000}
                    height={400}
                    data={data1}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" style={boldStyle} />
                    <XAxis style={boldStyle} dataKey="time" interval={0} ticks={['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']} stroke="#000">
                        <Label style={boldStyle} value="Time" offset={-5} position="insideBottom" fill="#000" />
                    </XAxis>
                    <YAxis
                        style={boldStyle}
                        domain={[0, 40]}
                        tickCount={9}
                        stroke="#000"
                    >
                        <Label
                            style={boldStyle}
                            value="Wind Speed KT"
                            angle={-90}
                            position="insideLeft"
                            offset={10}
                            fill="#000"
                        />
                    </YAxis>
                    <Tooltip />
                    <Line
                        style={boldStyle}
                        type="monotone"
                        dataKey="windSpeed"
                        stroke="#ff0000"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </div>


            <div className='graph-container'>
                {/* Third Graph */}
                <LineChart
                    width={1000}
                    height={400}
                    data={data2}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" style={boldStyle} />
                    <XAxis dataKey="time" stroke="#000" style={boldStyle}>

                    </XAxis>
                    <YAxis
                        style={boldStyle}
                        domain={[-10, 70]}
                        tickCount={8}
                        stroke="#000"
                    >
                        <Label
                            style={boldStyle}
                            value="Maximum"
                            angle={-90}
                            position="insideLeft"
                            offset={10}
                            fill="#000"
                        />
                    </YAxis>
                    {/*<Tooltip />*/}
                    <Line
                        style={boldStyle}
                        type="monotone"
                        dataKey="Maximun"
                        stroke="#ff0000"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </div>

            <div className='graph-container'>
                {/* Fourth Graph */}
                <LineChart
                    width={1000}
                    height={400}
                    data={data3}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#000" style={boldStyle} />
                    <XAxis dataKey="time" stroke="#000" style={boldStyle}>

                    </XAxis>
                    <YAxis
                        style={boldStyle}
                        domain={[-10, 70]}
                        tickCount={8}
                        stroke="#000"
                    >
                        <Label
                            style={boldStyle}
                            value="Minimum"
                            angle={-90}
                            position="insideLeft"
                            offset={10}
                            fill="#000"
                        />
                    </YAxis>
                    {/*<Tooltip />*/}
                    <Line
                        style={boldStyle}
                        type="monotone"
                        dataKey="Minimun"
                        stroke="#ff0000"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </div>


        </>
    );
}