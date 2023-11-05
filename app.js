const apiKey = "08f2f883c3d48eeb217fe9f4ce6fa5d9"; //api key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //api url
const searchBox = document.querySelector(".search input");
const searchBnt = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`); //fetching data from the API

  //checking the response status and decide weather or not to display the informations
  if (response.status == 404 || response.status == 401) {
    error.style.display = "block";
    weatherSection.style.display = "none";
  } else {
    var data = await response.json();

    let cityName = document.querySelector(".city");
    let temperature = document.querySelector(".temp");
    let humidityInfo = document.querySelector(".humidity");
    let windInfo = document.querySelector(".wind");

    cityName.innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "*C";
    humidityInfo.innerHTML = data.main.humidity + "%";
    windInfo.innerHTML = data.wind.speed + "km/h";

    //change the weather icon according to the weather condition using switch statement
    let weatherStatus = data.weather[0].main;
    switch (weatherStatus) {
      case "Clouds":
        weatherIcon.src = "images/cloud.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.jpg";
      default:
        break;
    }

    // if (data.weather[0].main == "Clouds") {
    //   weatherIcon.src = "images/cloud.png";
    // } else if (data.weather[0].main == "Clear") {
    //   weatherIcon.src = "images/clear.png";
    // } else if (data.weather[0].main == "Rain") {
    //   weatherIcon.src = "images/rain.png";
    // } else if (data.weather[0].main == "Drizle") {
    //   weatherIcon.src = "images/drizzle.png";
    // } else if (data.weather[0].main == "Mist") {
    //   weatherIcon.src = "images/mist.jpg";
    // }

    weatherSection.style.display = "block";
    error.style.display = "none";
  }
}

searchBnt.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
