// Function to convert temperature from Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(0);
}

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

// Function to convert temperature from m/s to km/h
function metretokilometer(meter) {
  return (meter * 3.6).toFixed(1);
}

//Vairable
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

//By default

function apiCalling() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=beea3435003dac5511b106b3cd2c6350`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city_name.innerHTML = data.name;
      temp.innerHTML = kelvinToCelsius(data.main.temp);
      temp_max.innerHTML = kelvinToCelsius(data.main.temp_max);
      temp_min.innerHTML = kelvinToCelsius(data.main.temp_min);
      temp_feel.innerHTML = kelvinToCelsius(data.main.feels_like);
      humdity.innerHTML = data.main.humidity;
      wind.innerHTML = metretokilometer(data.wind.speed);
      pressure.innerHTML = data.main.pressure;
      Cloudiness.innerHTML = data.clouds.all;
      Visiblity.innerHTML = data.visibility / 1000;
      sunrise.innerHTML = unixToTime(data.sys.sunrise);
      sunset.innerHTML = unixToTime(data.sys.sunset);
      weather_des.innerHTML = data.weather[0].main;
      weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const aqi_Condition = document.getElementById("aqi_Condition");
      const aq_level = document.getElementById("aq_level");
      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=beea3435003dac5511b106b3cd2c6350`
      )
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1);
          console.log(data1.list[0].main.aqi);
          aqi_Index.innerHTML = data1.list[0].main.aqi;
          if (aqi_Index.innerHTML == 1) {
            aqi_Condition.innerHTML = "Good";
            aq_level.style.left = "5%";
          } else if (aqi_Index.innerHTML == 2) {
            aqi_Condition.innerHTML = "Fair";
            aq_level.style.left = "30%";
          } else if (aqi_Index.innerHTML == 3) {
            aqi_Condition.innerHTML = "Moderate";
            aq_level.style.left = "50%";
          } else if (aqi_Index.innerHTML == 4) {
            aqi_Condition.innerHTML = "Poor";
            aq_level.style.left = "70%";
          } else {
            aqi_Condition.innerHTML = "Very Poor";
            aq_level.style.left = "90%";
          }
        });
    });
}

apiCalling();

function apiCalling1() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=beea3435003dac5511b106b3cd2c6350`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city_name.innerHTML = data.name;
      temp.innerHTML = kelvinToCelsius(data.main.temp);
      temp_max.innerHTML = kelvinToCelsius(data.main.temp_max);
      temp_min.innerHTML = kelvinToCelsius(data.main.temp_min);
      temp_feel.innerHTML = kelvinToCelsius(data.main.feels_like);
      humdity.innerHTML = data.main.humidity;
      wind.innerHTML = metretokilometer(data.wind.speed);
      pressure.innerHTML = data.main.pressure;
      Cloudiness.innerHTML = data.clouds.all;
      Visiblity.innerHTML = data.visibility / 1000;
      sunrise.innerHTML = unixToTime(data.sys.sunrise);
      sunset.innerHTML = unixToTime(data.sys.sunset);
      weather_des.innerHTML = data.weather[0].main;
      weather_img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      //bg change
      const body = document.querySelector("body");
      if (data.weather[0].main === "Clouds") {
        body.style.backgroundImage = 'url("/cloud.jpg")';
      } else if (data.weather[0].main === "Clear") {
        body.style.backgroundImage = 'url("/sunny.jpg")';
      } else if (data.weather[0].main === "Snow") {
        body.style.backgroundImage = 'url("/snow.jpg")';
        document.querySelector("h1").style.color = "white";
      } else if (data.weather[0].main === "Rain") {
        body.style.backgroundImage = 'url("/rain.jpg")';
      } else {
        body.style.backgroundImage = 'url("/smoke.jpg")';
      }
      body.style.backgroundSize = "cover";

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const aqi_Condition = document.getElementById("aqi_Condition");
      const aq_level = document.getElementById("aq_level");
      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=beea3435003dac5511b106b3cd2c6350`
      )
        .then((res) => res.json())
        .then((data1) => {
          console.log(data1);
          console.log(data1.list[0].main.aqi);
          aqi_Index.innerHTML = data1.list[0].main.aqi;
          if (aqi_Index.innerHTML == 1) {
            aqi_Condition.innerHTML = "Good";
            aq_level.style.left = "5%";
          } else if (aqi_Index.innerHTML == 2) {
            aqi_Condition.innerHTML = "Fair";
            aq_level.style.left = "30%";
          } else if (aqi_Index.innerHTML == 3) {
            aqi_Condition.innerHTML = "Moderate";
            aq_level.style.left = "50%";
          } else if (aqi_Index.innerHTML == 4) {
            aqi_Condition.innerHTML = "Poor";
            aq_level.style.left = "70%";
          } else {
            aqi_Condition.innerHTML = "Very Poor";
            aq_level.style.left = "90%";
          }
        });
      weatherInput1.value = "";
    });
}

//click event

const weatherBtn = document.getElementById("weatherBtn");
weatherBtn.addEventListener("click", () => {
  const weatherInput = document.getElementById("weatherInput").value;
  const weatherInput1 = document.getElementById("weatherInput");
  if (weatherInput == "") {
    city_name.innerHTML = "Enter city name";
  } else {
    apiCalling1();
  }
});

// fgfgjfgjghdskfskdjf
