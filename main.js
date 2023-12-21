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

// Function to convert temperature from Kelvin to Celsius
function metretokilometer(meter) {
  return (meter * 3.6).toFixed(1);
}

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

const weatherBtn = document.getElementById("weatherBtn");
weatherBtn.addEventListener("click", () => {
  const weatherInput = document.getElementById("weatherInput").value;
  if (weatherInput == "") {
    city_name.innerHTML = "Enter city name";
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=beea3435003dac5511b106b3cd2c6350`
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
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

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const aqi_Condition = document.getElementById("aqi_Condition");
        const aq_level = document.getElementById("aq_level");
        fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=beea3435003dac5511b106b3cd2c6350`
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
});
