import 'dotenv/config'
import axios from "axios"
const config = { headers: { " x-windy-api-key": `${process.env.WEBCAM_KEY}` } }
const WEBCAM_URL = ""
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_KEY}`

export default {
  getIndex: (req, res) => { 
    res.render('index')
  },
  postIndex: async (req, res) => {
    const { city } = await req.body
    console.log(city)
    const getWeatherData = await axios.get(`${WEATHER_URL}&q=${city}`)
    console.log(getWeatherData.data)

    res.redirect('/')
  }
}