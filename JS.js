let searchForWheatherInput = document.getElementById("SearchInput");
var wheatherData = null;
var cards = [];
const apiKey = "61ce56466215e18a6a259c6f5eb330d5";

class GeoLocation {
  static async get4NearlyPlaces(lat, lon) {
  let fetchedData;
  try {
      const response = await fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&cities=cities5000&radius=30&username=black_foxi`);
      fetchedData = await response.json();
  } catch (error) {
      console.error('Error:', error);
  }

  let rv = [];
  if (fetchedData && fetchedData.geonames) {
      for (let i = 1; i < fetchedData.geonames.length && i < 5; ++i ) {
          rv.push(fetchedData.geonames[i].name);
      }
  }
  return rv;
}

}

class ToDaySheet {
  static getHtml(
    date,
    description,
    temp,
    realFeel,
    sunRise,
    sunset,
    duration,
    icon
  ) {
    return `
   <div class="container bg-light mt-5" id="main-wheather-sheet">
    <div class="d-flex justify-content-between">
        <p class="text-aquamarine text-bold-aquamarine">CURRENT WHEATHER</p>
        <p class="text-aquamarine text-bold-aquamarine" id="date">
            ${date}
        </p>
    </div>

    <div class="d-flex justify-content-around ">
        <div class="flex-column justify-content-center text-center  ">
            <img class="wheather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
            <p id="text-for-icon">${description}</p>
        </div>

        <div class="d-flex flex-column justify-content-center text-center align-bottom  ">
            <p class="p-0 m-0 temperature-text">${temp}C</p>
            <p id="real-feel" class="text-black-50 m-0 p-0">Real feel ${realFeel}C</p>
        </div>

        <div class=" d-flex flex-column justify-content-center text-center align-bottom ">
            <p id="sumRiseText" class="m-0 p-0 ">Sun rise:${sunRise}</p>
            <p id="SunsetText" class="m-0 p-0">Sunset:${sunset}</p>
            <p id="DurationText" class="m-0 p-0">Duration:${duration}</p>
        </div>
    </div>
</div>
`;
  }
}

class HourlyTable {
  static getHourPlus(hoursToAdd) {
    // Create a new Date object for the current date and time
    let now = new Date();

    // Add the specified number of hours to the current hour
    now.setHours(now.getHours() + hoursToAdd);

    // Get the new hour
    let hour = now.getHours();

    return hour;
  }

  static getHtml(icon, description, temp, feels_like, wind, title) {
    return `
      <div class="d-flex justify-content-start">
            <p class="text-aquamarine text-bold-aquamarine">hourly</p>
        </div>
        <table class="table">
      <thead>
            <tr class="text-center">
                <th scope="col">${title}</th>
                <th scope="col">${this.getHourPlus(0)}</th>
                <th scope="col">${this.getHourPlus(1)}</th>
                <th scope="col">${this.getHourPlus(2)}</th>
                <th scope="col">${this.getHourPlus(3)}</th>
                <th scope="col">${this.getHourPlus(4)}</th>
                <th scope="col">${this.getHourPlus(5)}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-center">
                <th scope="row"></th>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
                <td><img class="wheather-icon" src='https://openweathermap.org/img/wn/${icon}@2x.png'></td>
            </tr>
            <tr class="text-center">
                <th scope="row">Forecast</th>
                <td>${description}</td>
                <td>${description}</td>
                <td>${description}</td>
                <td>${description}</td>
                <td>${description}</td>
                <td>${description}</td>
            </tr>
            <tr class="text-center">
                <th scope="row">Temp</th>
                <td>${temp}</td>
                <td>${temp}</td>
                <td>${temp}</td>
                <td>${temp}</td>
                <td>${temp}</td>
                <td>${temp}</td>
            </tr>
            <tr class="text-center">
                <th scope="row">Real feel</th>
                <td>${feels_like}</td>
                <td>${feels_like}</td>
                <td>${feels_like}</td>
                <td>${feels_like}</td>
                <td>${feels_like}</td>
                <td>${feels_like}</td>
            </tr>
            <tr class="text-center">
                <th scope="row">Wind (km/h)</th>
                <td>${wind} ESE</td>
                <td>${wind} ESE</td>
                <td>${wind} ESE</td>
                <td>${wind} ESE</td>
                <td>${wind} ESE</td>
                <td>${wind} ESE</td>
            </tr>
        </tbody>
        
        </table>
    `;
  }
}

class WheatherCard {
  constructor(title, date, temp,realFeel,  icon,description, speed,divId)
  {
    this.title = title;
    this.date = date;
    this.temp = temp;
    this.realFeel = realFeel;
    this.icon = icon;
    this.description = description;
    this.speed = speed;
    this.divId = divId;
  }

  static getHtml(title, date, temp, icon, realFeel, description, divId) {
    
    return `
    <div class="d-flex flex-column justify-content-center  p-4 flex-fill m-auto me-2 text-center wheater-card" id='${divId}'>
          <p class="text-bold-aquamarine">${title}</p>
          <p class="text-black-50">${date}</p>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" class="wheather-icon mx-auto d-block">
          <p class="temperature-text">${temp} C</p>
          <p class="text-black-50">${realFeel}</p>
          <p>${description}</p>
    </div>
  `;
  }
}

class NearlyPlaceCard {
  constructor(cityName, icon, temp) {
    this.cityName = cityName;
    this.icon = icon;
    this.temp = temp;
  }

  getHtml() {
    return `<div class="near-place offset-1 col-5 m-auto mb-3 row  align-bottom">
            <div class="offset-1 col-5   ">
                <p class="m-auto">${this.cityName}</p>
            </div>
            <div class="offset-1 col-5 justify-content-around d-flex">
                <img src="https://openweathermap.org/img/wn/${this.icon}@2x.png" class="wheather-icon-small m-auto ">
                <p class="m-auto">${this.temp} C</p>
            </div>
        </div>`;
  }
}

class FiveDayes {
  static getNextDay(dayes) {
    // Create a new Date object for the current date and time
    let now = new Date();

    // Add one day to the current date
    now.setDate(now.getDate() + dayes);

    // Array of week day names
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the day of the week for the next date
    let day = days[now.getDay()];

    return day;
  }

  static getNextDate(dayes) {
    // Create a new Date object for the current date and time
    let now = new Date();

    // Add one day to the current date
    now.setDate(now.getDate() + dayes);

    // Format the date as a string in the format 'dd.mm.yyyy'
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let year = now.getFullYear();

    return day + "." + month + "." + year;
  }

  static getHtml() {
    let innerCards = [];
    let rv = "";
    for (let i = 0; i < 5; ++i) {
      let nameOfDay = "ToDay";
      if (i != 0) {
        nameOfDay = this.getNextDay(i);
      }
      innerCards.push(
        new WheatherCard(
          nameOfDay,
          this.getNextDate(i),
          Wheather.kelvinToCelsius(wheatherData.main.temp),
          Wheather.kelvinToCelsius(wheatherData.main.feels_like),
          wheatherData.weather[0].icon,
          wheatherData.weather[0].description,
          wheatherData.wind.speed,
          `div${i}`,
        )
      );
      rv += WheatherCard.getHtml(
        nameOfDay,
        this.getNextDate(i),
        Wheather.kelvinToCelsius(wheatherData.main.temp),
        wheatherData.weather[0].icon,
        Wheather.kelvinToCelsius(wheatherData.main.feels_like),
        wheatherData.weather[0].description,
        `div${i}`
      );
    }
    cards = innerCards;
    return `
    <div class="container  mt-5 d-flex ">
      ${rv} 
    </div>
    `;
  }
}

class Wheather {
  static secondsToTime(secs) {
    let dateObj = new Date(secs * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    return timeString;
  }

  static kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  static getWeatherDataByLatLong(lat, lon) {
    $.ajax({
      url: `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
      },
      error: function () {
        console.log("Error occurred");
      },
    });
  }
  static getWeatherData(cityName) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          resolve(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("AJAX error: ", textStatus, errorThrown);
          reject(jqXHR.responseJSON || errorThrown);
        },
      });
    });
  }
}

class NearlyPlaces {
  static async generateCards(names) {
    let promises = names.map(async (element) => {
      let weather = await Wheather.getWeatherData(element);
      return new NearlyPlaceCard(
        element,
        weather.weather[0].icon,
        Wheather.kelvinToCelsius(weather.main.temp)
      );
    });

    let rv = await Promise.all(promises);
    return rv;
  }

  static getHtml(placeCards) {
    let rv = `<div class="justify-content-start ">
        <p class="text-aquamarine  text-bold-aquamarine">Nearby places</p>
    </div><div class='row'>`;
    placeCards.forEach((element) => {
      rv += element.getHtml();
    });
    rv += "</div>";
    return rv;
  }
}

class UI {
  static chageToToDay(
    date,
    description,
    temp,
    realFeel,
    sunRise,
    sunset,
    duration,
    icon
  ) {
    let mainWheatherSheet = document.getElementById("MainWheatherSheet");
    mainWheatherSheet.innerHTML = ToDaySheet.getHtml(
      date,
      description,
      temp,
      realFeel,
      Wheather.secondsToTime(sunRise),
      Wheather.secondsToTime(sunset),
      Wheather.secondsToTime(duration),
      icon
    );
  }
  static chageToToFiveDayes() {
    let mainWheatherSheet = document.getElementById("MainWheatherSheet");
    mainWheatherSheet.innerHTML = FiveDayes.getHtml();
    for (let i = 0; i < 5; ++i) {
      document.getElementById(`div${i}`).addEventListener("click", function () {
        UI.refreshHourlyTable(cards[i].icon, cards[i].description, cards[i].temp, cards[i].realFeel, cards[i].speed, cards[i].title);
      });
    }
  }

  static refreshHourlyTable(icon, description, temp, feels_like, wind, title) {
    let hourlyTable = document.getElementById("hourlyTable");
    hourlyTable.innerHTML = HourlyTable.getHtml(
      icon,
      description,
      temp,
      feels_like,
      wind,
      title
    );
  }
  static async displayNearlyPlaces() {
    if (wheatherData) {
      let nearlyPlacesSheet = document.getElementById("NearlyPlacesSheet");
      nearlyPlacesSheet.innerHTML = NearlyPlaces.getHtml(
        await NearlyPlaces.generateCards(
          await GeoLocation.get4NearlyPlaces(
            wheatherData.coord.lat,
            wheatherData.coord.lon
          )
        )
      );
    }
  }

  static async refreshMainScreen() {
    let mainScreen = document.getElementById("MainScreen");
    mainScreen.innerHTML = `<div class="container" id='MainWheatherSheet'>

        </div>

        <div class="container bg-light  mt-5" id="hourlyTable">

        </div>

        <div class="container bg-light " id="NearlyPlacesSheet">
        </div>`;
  }

  static displayError(name) {
    let rv = `<div class="container d-flex align-items-center justify-content-center error-bg text-center mt-5"
            style="height: 700px;">
            <div class="d-flex flex-column align-items-center">
                <div class="d-block bg-black ">
                    <p class="text-black-50" style="font-size: 60px;">
                        ${name} could not be found.
                    </p>
                </div>
                <div class="d-block">
                    <p class="text-black-50" style="font-size: 60px;">
                        Please enter a different location.
                    </p>
                </div>
            </div>
        </div>`;
    let mainScreen = document.getElementById("MainScreen");
    mainScreen.innerHTML = rv;
  }
}

function FiveDayesScreenChage() {
  if (wheatherData != null) {
    UI.chageToToFiveDayes();
  }
}
function TodayScreenChage() {
  if (wheatherData != null) {
    UI.chageToToDay(
      new Date().toLocaleDateString(),
      wheatherData.weather[0].description,
      Wheather.kelvinToCelsius(wheatherData.main.temp),
      Wheather.kelvinToCelsius(wheatherData.main.feels_like),
      wheatherData.sys.sunrise,
      wheatherData.sys.sunset,
      wheatherData.sys.sunrise,
      wheatherData.weather[0].icon
    );
  }
}

addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting
  let data = null;
  try {
    data = await Wheather.getWeatherData(searchForWheatherInput.value);
    //console.log(Wheather.getWeatherDataByLatLong(data.coord.lat, data.coord.lon));
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  if (data) {
    wheatherData = data;
    console.log(wheatherData);
    UI.refreshMainScreen();
    UI.chageToToDay(
      new Date().toLocaleDateString(),
      data.weather[0].description,
      Wheather.kelvinToCelsius(data.main.temp),
      Wheather.kelvinToCelsius(data.main.feels_like),
      data.sys.sunrise,
      data.sys.sunset,
      data.sys.sunrise,
      data.weather[0].icon
    );
    UI.refreshHourlyTable(
      data.weather[0].icon,
      data.weather[0].description,
      Wheather.kelvinToCelsius(data.main.temp),
      Wheather.kelvinToCelsius(data.main.feels_like),
      data.wind.speed,
      "Today"
    );
    UI.displayNearlyPlaces();
  } else {
    UI.displayError(searchForWheatherInput.value);
    wheatherData = data;
  }
});
