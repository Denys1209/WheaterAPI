function getWeatherData(cityName) {
 let apiKey = '8786bfb2e2d6bf6ce4d36651ddf74954';
 $.ajax({
  url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey,
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  },
  error: function() {
    // handle any errors
  }
 });
}

getWeatherData('London');