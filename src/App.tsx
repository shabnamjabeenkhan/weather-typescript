import './App.css'
import axios from 'axios'
import { useState } from 'react'
import sunsetImage from './assets/sunset.jpeg'

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

function App() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState("")

const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if(event.key === "Enter"){
    axios.get(url).then((response) => {
      setData(response.data)
    })
    setLocation("")
  }
}

  return (
    <>
<div className="app" style={{backgroundImage: `url(${sunsetImage})`}}>
  <div className="search">
    <input value={location} type="text" name="" onKeyDown={searchLocation} onChange={(event => setLocation(event.target.value))} id="" placeholder="Search for a city" />
  </div>
  <div className="container">
    <div className="top">
      <div className="location"></div>
      {data?.name}
      <div className="temp">
      {data?.main ? <h1>{data.main.temp.toFixed()}°c</h1> : null}
      </div>
      <div className="description">
      {data?.weather ? <p>{data.weather[0].main}</p> : null}

      </div>
    </div>
    <div className="bottom">
    <div className="feels">
    {data?.main ? <p className='bold'>{data.main.feels_like.toFixed()}°c</p> : null}
    </div>
    <div className="humidity">
    {data?.main ? <p className='bold'>{data.main.humidity}%</p> : null}
    </div>
    <div className="wind">
    {data?.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
    </div>
    </div>
  </div>
</div>

    </>
  )
}

export default App
