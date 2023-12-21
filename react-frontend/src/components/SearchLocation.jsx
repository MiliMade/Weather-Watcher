import WeatherInfo from "./WeatherInfo"
import Webcam from "./Webcam"
import { useState, useEffect} from "react" 
import axios from "axios"

const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?appid=${import.meta.env.VITE_WEATHER_KEY}`

const Location = () => {
  const [coordinates, setCoordinates] = useState({lat:0, long:0})
  const [inputLocation, setInputLocation] = useState("")

  function handleInput(e){
    setInputLocation(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault()
    const cityCoordinates = await axios.get(`${GEO_URL}&q=${inputLocation}`)
    const cityLat = cityCoordinates.data[0].lat
    const cityLon = cityCoordinates.data[0].lon
    console.log(cityLat)
    console.log(cityLon)
  }







  return (
    <div>
      <form action="" onSubmit={handleSubmit} >
        <label htmlFor="location">Enter name of location:</label>
        <input type="text"  onChange={handleInput} value={inputLocation} name="location"/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Location