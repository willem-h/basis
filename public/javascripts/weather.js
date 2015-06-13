function getWeather () {
  $.ajax({
    url: "./weather/update"
  }).done(function(weather) {
    console.log(weather);

    if (weather) {
      function changeIcon (wi) {
        console.log(wi);
        if (wi) {
          $('#weather-icon').html("<i class='wi wi-" + wi + "'></i>");
        }
      }

      console.log(weather.current.code);

      var c = "";

      switch (parseInt(weather.current.code)) {
        case 0:
          c = 'tornado';
          break;
        case 1 || 2:
          c = 'hurricane';
          break;
        case 3 || 4 || 37 || 38 || 39 || 45 || 47:
          c = 'thunderstorm';
          break;
        case 5 || 6 || 7 || 35:
          c = 'rain-mix';
          break;
        case 8 || 9:
          c = 'sprinkle';
          break;
        case 10 || 11 || 12 || 40:
          c = 'showers';
          break;
        case 13 || 14 || 15 || 16 || 41 || 42 || 43 || 46:
          c = 'snow';
          break;
        case 17:
          c = 'hail';
          break;
        case 18:
          c = 'sleet';
          break;
        case 19:
          c = 'dust';
          break;
        case 20:
          c = 'fog';
          break;
        case 21:
          c = 'day-haze';
          break;
        case 22:
          c = 'smoke';
          break;
        case 23 || 24:
          c = 'windy';
          break;
        case 25:
          c = 'snowflake-cold';
          break;
        case 26:
          c = 'cloudy';
          break;
        case 27:
          c = 'night-alt-cloudy';
          break;
        case 28:
          c = 'day-cloudy';
          break;
        case 29:
          c = 'night-partly-cloudy';
          break;
        case 30 || 44:
          c = 'day-sunny-overcast';
          break;
        case 31 || 33:
          c = 'night-clear';
          break;
        case 32 || 34:
          c = 'day-sunny';
          break;
        case 36:
          c = 'hot';
          break;
        case 3200:
          $('#weather-icon').html("--");
          console.log("Unknown condition");
      }

      changeIcon(c);

      $('#sunrise-time').text(weather.astronomy.sunrise);
      $('#sunset-time').text(weather.astronomy.sunset);
      $('#current #temp').text(weather.current.temp);
    } else {
      getWeather();
    }
  });
}

getWeather();
