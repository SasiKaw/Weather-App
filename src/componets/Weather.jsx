import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    const search = async (city) => {

        if (city === "") {
            alert("Enter a city name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            // if(!response.ok){
            //     alert(data.message);
            // }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            })
        }
        catch (err) {
            setWeatherData(false);
            console.error("Error feteching the weather data");
        }
    }

    // hook used to handle side effects (functions that are not directly related to the componet) in the componet
    useEffect(() => {
        search('New York');
    }, [])

    return (
        <div id="weather" className='place-self-center rounded-xl p-10 flex flex-col items-center bg-gradient-to-r from-cyan-400 to-yellow-200 shadow-lg'>
            <div id="search-bar" className='flex flex-row gap-3 items-center'>
                <input ref={inputRef} type="text" placeholder='Search' className='h-12 border-none outline-none rounded-3xl pl-6 text-gray- bg-slate-100 text-lg shadow-xl' />
                <button onClick={() => search(inputRef.current.value)} className='w-12 p-4 rounded-full bg-slate-100 cursor-pointer shadow-xl'><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            {weatherData ? <>
                <img src={weatherData.icon} alt="clear" className='w-40  mt-7 mb-7'/>
                <p className='text-black text-7xl leading-none'>{weatherData.temperature}°C</p>
                <p className='text-black text-4xl mt-3'>{weatherData.location}</p>
                <div id="weather-data" className='w-full mt-10 flex justify-around'>
                    <div id="col" className='flex items-start gap-3 text-lg'>
                        <img src={humidity_icon} alt="humidity" className='w-8 mt-2' />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span className='block text-base mt-3'>Humidity</span>
                        </div>
                        <div id="col" className='flex items-start gap-3 text-lg'>
                            <img src={wind_icon} alt="wind" className='w-8 mt-2' />
                            <div>
                                <p>{weatherData.windSpeed} Km/h</p>
                                <span className='block text-base mt-3'>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div>
                    <p className='mt-5 bg-lime-200 p-2 rounded-3xl text-red-600 font-semibold shadow-lg'>City Not Found</p>
                </div>
            </>}
        </div>
    )
}

export default Weather;