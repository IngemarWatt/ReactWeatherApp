import React, {useContext} from "react"

import Context from "../Context"

const WeatherData = () => {
    const {weather, city, summary, iconCode} = useContext(Context) 
    const {temp, humidity, pressure} = weather
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

    return(
        <div className="weather-data">
            <p className="weather__tagline">Weather information for <span className="weather-data__city">{city}</span></p>
            <div className="weather-data__summary">
                <img width="50" height="50" className="weather-data__spacer-icon" src={iconUrl} alt="Spacer image"/>
                <span>{summary}</span>
                <img width="50" height="50" className="weather-data__summary-icon" src={iconUrl} alt={summary}/>
            </div>
            <div className="weather-data__box">
                <span className="weather-data__property">
                    <p className="weather-data__title">Temperature</p>
                    <p className="weather-data__value">{temp}</p>
                </span>
                <span className="weather-data__property">
                    <p className="weather-data__title">Humidity</p>
                    <p className="weather-data__value">{humidity}</p>
                </span>
                <span className="weather-data__property">
                    <p className="weather-data__title">Pressure</p>
                    <p className="weather-data__value">{pressure}</p>
                </span>
            </div>
        </div>
    )
}

export default WeatherData