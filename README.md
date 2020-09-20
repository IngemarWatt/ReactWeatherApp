# React weather app made for a YoungShand internship application

## Weather App
This Web App fetches the current weather data for a specified city. A background image of the corresponding city is also fetched and placed behind the weather data.

The app makes calls to two separate REST APIs, the first of which is the OpenWeatherMaps [Current Weather Data API](https://openweathermap.org/current). This is used to get the current weather information for the specified city, as well as an icon corresponding to that weather. 

The second API used in this app is Flickr's [flickr.photos.search API](https://www.flickr.com/services/api/flickr.photos.search.html). This is used to fetch a background image corresponding to the name of the city entered by the user. The large range of arguments supported by this API allowed me to filter out indoor photos and sort them by relevance. These arguments were the reason I chose it over something like Google's [Place Photos API](https://developers.google.com/places/web-service/photos), which was my initial choice because I have worked with their APIs in the past.

## Installation
* Download or clone the repository
* Make sure NodeJS is installed, available [here](https://nodejs.org/en/).
* Install node modules by entering `npm install` in the terminal
* Install bootstrap by entering `npm i -s bootstrap` in the terminal
* Install axios by entering `npm install axios` in the terminal
* Launch the project by entering `npm start` in the terminal


# Testing images

<img src="https://github.com/IngemarWatt/ReactWeatherApp/blob/master/GitHubScreenshots/Amsterdam.png" width="480">
