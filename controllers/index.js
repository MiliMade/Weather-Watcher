import 'dotenv/config'
import axios from "axios"
const config = { headers: { " x-windy-api-key": `${process.env.WEBCAM_KEY}` } }
const WEBCAM_URL = "https://api.windy.com/webcams/api/v3/webcams?include=player"
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_KEY}`
const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?appid=${process.env.WEATHER_KEY}`

let getWeatherData;
let getWebCamData;
let webCamDayVid;
let weatherIcon;

export default {
  getIndex: (req, res) => { 
    res.render('index', {weatherData:getWeatherData, videoLink:webCamDayVid, weatherIcon, webCamData:getWebCamData})
  },
  postIndex: async (req, res) => {  
    const { city } = await req.body   
    const cityCoordinates = await axios.get(`${GEO_URL}&q=${city}`)
    const cityLat = cityCoordinates.data[0].lat
    const cityLon = cityCoordinates.data[0].lon
    const getWeatherAPI = await axios.get(`${WEATHER_URL}&q=${city}`)
    const getWebCamAPI = await axios.get(`${WEBCAM_URL}&nearby=${cityLat},${cityLon},10`, config)
    getWeatherData = getWeatherAPI.data
    weatherIcon =`https://openweathermap.org/img/wn/${getWeatherData.weather[0].icon}.png`
    webCamDayVid = getWebCamAPI.data.webcams[0].player.day
    getWebCamData = getWebCamAPI.data.webcams[0]
    console.log(getWeatherData)
    console.log(getWebCamData) 
    console.log(webCamDayVid) 
    res.redirect('/')
  }
}