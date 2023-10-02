import 'dotenv/config'
import axios from "axios"
const config = { headers: { " x-windy-api-key": `${process.env.WEBCAM_KEY}` } }
const WEBCAM_URL = "https://api.windy.com/webcams/api/v3/webcams?include=player"
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_KEY}`
const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?appid=${process.env.WEATHER_KEY}`
export default {
  getIndex: (req, res) => { 
    res.render('index')
  },
  postIndex: async (req, res) => {
    const { city } = await req.body
    console.log(city)
    const cityCoordinates = await axios.get(`${GEO_URL}&q=${city}`)
    const cityLat = cityCoordinates.data[0].lat
    const cityLon = cityCoordinates.data[0].lon
    const getWeatherData = await axios.get(`${WEATHER_URL}&q=${city}`)
    const getWebCamAPI = await axios.get(`${WEBCAM_URL}&nearby=${cityLat},${cityLon},10`, config)
    const webCamData = getWebCamAPI.data.webcams
    console.log(webCamData)
    res.redirect('/')
  }
}