import React, {useState} from "react"
import axios from "axios"

import Context from "../Context"

import Header from "./Header"
import Tagline from "./Tagline"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeatherData"
import DateTime from "./DateTime"
import Footer from "./Footer"
import Error from "./Error"

// Constants relating to API calls
const FLICKR_API_KEY = "1ad8cddb7b919c633413b89f184e7917"
const WEATHER_API_KEY = "d600fb6f3f3ca7c91bdf5c5b82e3a1f7"
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const FLICKR_BASE_URL = "https://api.flickr.com/services/rest/"

// Boolean flag indicates which background is showing. Used to fade in new image.
var firstBackgroundShowing = true

const Main = () => {
    const [weather, setWeather] = useState()
    const [summary, setSummary] = useState()
    const [iconCode, setIconCode] = useState()
    const [city, setCity] = useState()
    const [error, setError] = useState()

    // Perform API call to get weather data. If successful, perform second API call to get image of corresponding city.
    const api_call = async e => {
        e.preventDefault()

        // Get location name from imput field
        const location = e.target.elements.location.value

        // Check if input is empty
        if(!location) return setError("Please enter the name of the city."), setWeather(null)

        var weatherUrl = WEATHER_BASE_URL

        // Append parameters to base weather url
        weatherUrl += `?q=${location}` // Location parameter
        weatherUrl += `&appid=${WEATHER_API_KEY}` // API key parameter
        weatherUrl += `&units=metric` // Metric units parameter

        // Perform the API call to fetch weather data
        const weatherResponse = await axios.get(weatherUrl).catch(err => {
            console.log("404 CAUGHT" )
            if (err.response.status === 404) {

                // Clear the city image background if response contained an error code
                document.getElementsByClassName("firstBackground")[0].style.display = "none"
                document.getElementsByClassName("secondBackground")[0].style.display = "none"
                document.getElementsByClassName("firstBackground")[0].src = ""
                document.getElementsByClassName("secondBackground")[0].src = ""

                // Display error message
                return setError("No results for \"" + location + "\", please try again."), setWeather(null)
            } 
        });

        
        if(weatherResponse && weatherResponse.status == 200){
            // Display weather data to user
            setWeather(weatherResponse.data.main)
            setSummary(weatherResponse.data.weather[0].main)
            setIconCode(weatherResponse.data.weather[0].icon)
            setCity(weatherResponse.data.name)
            setError(null)
    
            // Second API call to get the background image of the city corresponding to the weather data
            const cityName = weatherResponse.data.name

            var flickrUrl = FLICKR_BASE_URL

            // Append parameters to base weather url
            flickrUrl += "?method=flickr.photos.search" // API method parameter
            flickrUrl += `&api_key=${FLICKR_API_KEY}` // API key parameter
            flickrUrl += `&text=${cityName}` // Search keyword parameter
            flickrUrl += "&geo_context=2" // Filter so only outdoor images are returned
            flickrUrl += "&sort=relevance" // Return the most relevant image
            flickrUrl += "&per_page=1" // Return only one image
            flickrUrl += "&format=json" // Return JSON instead of XML
            flickrUrl += "&nojsoncallback=1" // Callback not needed

            // Perform the API call
            const flikrRequest = axios.get(flickrUrl)
            const flikrResponse = await flikrRequest

            // Extract information from the response
            const farm_id = flikrResponse.data.photos.photo[0].farm
            const server_id = flikrResponse.data.photos.photo[0].server
            const id = flikrResponse.data.photos.photo[0].id
            const secret = flikrResponse.data.photos.photo[0].secret
    
            // Construct the url to the image returned by the API call
            const backgroundImageUrl = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}_b.jpg`

            // Update the city background image using a fade-in animation
            fadeInBackground(backgroundImageUrl)
        }
    }

    return (
        <div className="main">
            <Header/>
            <Content>
                <Tagline/>
                <DateTime/>
                <Context.Provider value={{ api_call, weather, city, summary, iconCode, error}}>
                    <WeatherSearch/>
                    { weather && <WeatherData/> }
                    { error && <Error error={error}/> }
                </Context.Provider>
                <Footer/>
            </Content>
        </div>
    )
}

// Updates the city background image using a fade-in animation
async function fadeInBackground(url){
    // Use boolean flag to establish which image element is currently displaying the background
    var newBackground = firstBackgroundShowing ? document.getElementsByClassName("secondBackground")[0] : document.getElementsByClassName("firstBackground")[0];
    var oldBackground = firstBackgroundShowing ? document.getElementsByClassName("firstBackground")[0] : document.getElementsByClassName("secondBackground")[0];
   
    // Initialize low opacity for fade animation
    var op = 0.1

    // Error handling sets style.display to "none". This ensures both image elements are visible
    newBackground.style.display = "inline"
    oldBackground.style.display = "inline"

    // Update the new backgrounds opacity and src url
    newBackground.style.opacity = op
    newBackground.src = url

    // Place the new background in front of the old one so that the animation is seen by the user
    newBackground.style.zIndex = 0
    oldBackground.style.zIndex = -1

    // Increment the opacity of the new background to fade it in.
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
    newBackground.style.opacity = op;
    newBackground.style.filter = 'alpha(opacity=' + op * 100 + ")"; // IE 5+ Support
    op += op * 0.1;
    }, 10);
    
    firstBackgroundShowing = !firstBackgroundShowing
}

export default Main