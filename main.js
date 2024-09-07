// Function to convert temperature from UNIX to Local time
function unixToTime(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Variables
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_max = document.getElementById("temp_max");
const temp_min = document.getElementById("temp_min");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const temp_feel = document.getElementById("temp_feel");
const humdity = document.getElementById("humdity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const Cloudiness = document.getElementById("Cloudiness");
const Visiblity = document.getElementById("Visiblity");
const weather_des = document.getElementById("weather_des");
const weather_img = document.querySelector(".weather_image img");

// Function to update weather display
function updateWeatherDisplay(data) {
  city_name.innerHTML = data.name;
  temp.innerHTML = data.main.temp.toFixed(0);
  temp_max.innerHTML = data.main.temp_max.toFixed(0);
  temp_min.innerHTML = data.main.temp_min.toFixed(0);
  temp_feel.innerHTML = data.main.feels_like.toFixed(0);
  humdity.innerHTML = data.main.humidity;
  wind.innerHTML = data.wind.speed;
  pressure.innerHTML = data.main.pressure;
  Cloudiness.innerHTML = data.clouds.all;
  Visiblity.innerHTML = data.visibility / 1000;
  sunrise.innerHTML = unixToTime(data.sys.sunrise);
  sunset.innerHTML = unixToTime(data.sys.sunset);
  weather_des.innerHTML = data.weather[0].main;
  weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  // Background change
  const body = document.querySelector("body");
  switch (data.weather[0].main) {
    case "Clouds":
      body.style.backgroundImage = 'url("/cloud.jpg")';
      break;
    case "Clear":
      body.style.backgroundImage = 'url("/sunny.jpg")';
      break;
    case "Snow":
      body.style.backgroundImage = 'url("/snow.jpg")';
      break;
    case "Rain":
      body.style.backgroundImage = 'url("/rain.jpg")';
      break;
    default:
      body.style.backgroundImage = 'url("/smoke.jpg")';
  }
  body.style.backgroundSize = "cover";
  body.style.backgroundAttachment = "fixed";
}

// Function to update air quality display
function updateAirQualityDisplay(lat, lon) {
  const aqi_Condition = document.getElementById("aqi_Condition");
  const aq_level = document.getElementById("aq_level");

  fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=beea3435003dac5511b106b3cd2c6350`
  )
    .then((res) => res.json())
    .then((data1) => {
      const aqi = data1.list[0].main.aqi;
      const aqiLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
      const leftPositions = ["5%", "30%", "50%", "70%", "90%"];

      aqi_Condition.innerHTML = aqiLevels[aqi - 1];
      aq_level.style.left = leftPositions[aqi - 1];
    });
}

// Function to fetch and display weather data
function fetchWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=beea3435003dac5511b106b3cd2c6350`
  )
    .then((response) => response.json())
    .then((data) => {
      updateWeatherDisplay(data);
      updateAirQualityDisplay(data.coord.lat, data.coord.lon);
    });
}

// Default city weather
fetchWeatherData("delhi");

const weatherBtn = document.getElementById("weatherBtn");
const weatherInput1 = document.getElementById("weatherInput");

// Function to handle user input and fetch weather
function fetchAndDisplay() {
  const weatherInput = weatherInput1.value;

  if (weatherInput === "") {
    city_name.innerHTML = "Enter city name";
  } else {
    fetchWeatherData(weatherInput);
    weatherInput1.value = "";
  }
}

// Event listeners
weatherBtn.addEventListener("click", () => {
  fetchAndDisplay();
});

weatherInput1.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchAndDisplay();
  }
});
