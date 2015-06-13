var express = require('express');
var router = express.Router();
var YQL = require('yql');

function getWeather (callback) {
  var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="warrnambool")');

  query.exec(function(err, data) {
    if (err) { console.error(err) };
    if (data.query.results !== null) {
      var location = data.query.results.channel.location;
      var weather = {
        current: data.query.results.channel.item.condition,
        astronomy: data.query.results.channel.astronomy,
        forecast: data.query.results.channel.item.forecast,
        wind: data.query.results.channel.wind,
        atmosphere: data.query.results.channel.atmosphere
      }

      // Unit conversions from imperial to metric
      weather.current.temp = Math.round((weather.current.temp - 32) * 5 / 9)
      weather.wind.speed = weather.wind.speed * 1.609344
      weather.wind.chill = Math.round((weather.current.temp - 32) * 5 / 9)

      // console.log(JSON.stringify(data.query.results.channel.wind, null, 3));

      var n = weather.wind.direction;
      n = 343;
      // n = Math.floor(n/15.0) * 15;
      // weather.wind.direction = n;
      // if(n > 0)
      //   return Math.ceil(n/3.0) * 3;
      // else if( n < 0)
      //   return Math.floor(n/3.0) * 3;
      // else
      //   return 3;

      Number.prototype.roundTo = function(num) {
        var resto = this%num;
        if (resto <= (num/2)) {
          return this-resto;
        } else {
          return this+num-resto;
        }
      }

      weather.wind.direction = Number(n).roundTo(15);


      console.log("Temp: " + weather.current.temp + " Chill: " + weather.wind.chill + " Wind: " + weather.wind.direction);

      callback(weather);
    } else {
      console.log("Undefined weather response");
      callback(false);
    }
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getWeather(function (weather) {
    res.render('weather', { title: 'Weather' });
  })
});

router.get('/update', function(req, res, next) {
  getWeather(function (weather) {
    res.send(weather);
  })
});

module.exports = router;
