# React weather app made for a YoungShand internship application

## Weather App
This Web App fetches the current weather data for a city specified by the user. A background image of the corresponding city is also fetched and placed behind the weather data.

The app makes calls to two separate REST APIs, the first of which is the OpenWeatherMaps [Current Weather Data API](https://openweathermap.org/current). This is used to get the current weather information for the specified city, as well as an icon corresponding to those weather conditions. 

The second API used in this app is Flickr's [flickr.photos.search API](https://www.flickr.com/services/api/flickr.photos.search.html). This is used to fetch a background image corresponding to the name of the city entered by the user. The large range of arguments supported by this API allowed me to filter out indoor photos and sort them by relevance. These arguments were the reason I chose it over something like Google's [Place Photos API](https://developers.google.com/places/web-service/photos), which was my initial choice because I have worked with their APIs in the past.

## Installation
* Download or clone the repository
* Make sure NodeJS is installed, available [here](https://nodejs.org/en/).
* Install node modules by entering `npm install` in the terminal
* Install bootstrap by entering `npm i -s bootstrap` in the terminal
* Install axios by entering `npm install axios` in the terminal
* Launch the project by entering `npm start` in the terminal


## Screenshots
This is the home page. The user is prompted to enter the name of their chosen city.<br/>
<img src="https://github.com/IngemarWatt/ReactWeatherApp/blob/master/GitHubScreenshots/HomePage.png" width="640">
<br/>
<br/>
<br/>
After the user enters 'Auckland' and presses enter, the current weather information for Auckland is shown over a background of Auckland City.<br/>
<img src="https://github.com/IngemarWatt/ReactWeatherApp/blob/master/GitHubScreenshots/Auckland.png" width="640">
<br/>
<br/>
<br/>
Entering 'Amsterdam' and pressing enter will update the weather information to that of Amsterdam, and the background image will switch to a photo of Amsterdam with a fade transition.<br/>
<img src="https://github.com/IngemarWatt/ReactWeatherApp/blob/master/GitHubScreenshots/Amsterdam.png" width="640">
<br/>
<br/>
<br/>
If a city corresponding to the user's input cannot be found, an error message is shown and the background image is removed.<br/>
<img src="https://github.com/IngemarWatt/ReactWeatherApp/blob/master/GitHubScreenshots/invalidInput.png" width="640">
