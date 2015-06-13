var express = require('express');
var router = express.Router();
var YQL = require('yql');

function getWeather (callback) {
  var query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="warrnambool")');

  query.exec(function(err, data) {
    var location = data.query.results.channel.location;
    var condition = data.query.results.channel.item.condition;

    console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
    callback('The current weather in ' + location.city + ', ' + location.region + ' is ' + Math.round((condition.temp - 32) * 5 / 9) + '&deg;C');
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getWeather(function (data) {
    res.send(data);
  })
  // res.send('respond with a resource');

});

module.exports = router;
