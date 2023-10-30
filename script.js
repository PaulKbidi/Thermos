document.addEventListener("DOMContentLoaded", getTemperature);

function getTemperature() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);

      const api = `https://weather.contrateumdev.com.br/api/weather?lat=${latitude}&lon=${longitude}`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          const city = data.name;
          const temp = data.main.temp;
          const temp_max = data.main.temp_max;
          const temp_min = data.main.temp_min;

          const cityElement = document.getElementById("city");
          const temperatureElement = document.getElementById("temperature");
          const temperatureMaxElement = document.getElementById("temperature_max");
          const temperatureMinElement = document.getElementById("temperature_min");

          cityElement.textContent = `${city}`;
          temperatureElement.textContent = `Température : ${temp} °C`;
          temperatureMaxElement.textContent = `Température : ${temp_max} °C`;
          temperatureMinElement.textContent = `Température : ${temp_min} °C`;
        })
        .catch((error) => {
          console.error("Une erreur s'est produite : ", error);
        });
    });
  } else {
    console.error(
      "La géolocalisation n'est pas prise en charge par votre navigateur."
    );
  }
}
