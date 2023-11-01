const apiKey = "";
const apiUrl = "";
const searchBox = document.querySelector(".search input");
const searchBnt = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const weatherSection = document.querySelector(".weather");

("https://api.openweathermap.org/data/2.5/weather?units=metric&q=");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
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

    //change the weather icon according to the weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloud.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.jpg";
    }

    weatherSection.style.display = "block";
    error.style.display = "none";
  }
}

searchBnt.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
