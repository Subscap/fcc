'use strict';

(function() {

//Added a few extra locations - could extend this with a more comprehensive and searchable list in the future
var cities = [
  {'city':'Tampa, FL', 'lat':27.9506, 'long':-82.4572},
  {'city':'New York, NY', 'lat':40.77, 'long':-73.98},
  {'city':'Pittsburg, PA', 'lat':40.35, 'long':-79.93},
  {'city':'Atlanta, GA', 'lat':33.65, 'long':-84.42},
  {'city':'Orlando, FL', 'lat':28.5383, 'long':-81.3792},
  {'city':'Dallas, TX', 'lat':32.73, 'long':-96.97},
  {'city':'Jackson, MS', 'lat':32.2988, 'long':-90.1848},
  {'city':'St Louis, MO', 'lat':38.75, 'long':-90.37},
  {'city':'San Diego, CA', 'lat':32.82, 'long':-117.13},
  {'city':'Seattle, WA', 'lat':47.45, 'long':-122.30},
  {'city':'London, England', 'lat':51.47999954, 'long':-0.44999999},
  {'city':'Muscat, Oman', 'lat':23.57999992, 'long':58.27999878},
  {'city':'Moscow, Russia', 'lat':55.83000183, 'long':37.61999893},
  {'city':'Tokyo, Japan', 'lat':35.54999924, 'long':139.77999878},
  {'city':'Cairo, Egypt', 'lat':30.12999916, 'long':31.39999962}
];

var currentWeather = {};

//Get user location from ip-api.com
function getLocation() {
  var xhttp = new XMLHttpRequest();
  var url = "//freegeoip.net/json/";
  
  xhttp.onreadystatechange = function() {
    if ( xhttp.readyState == 4 && xhttp.status == 200 ) {
      var locationData = JSON.parse(xhttp.responseText);
      var location = locationData.latitude + "," + locationData.longitude;
      getWeather(location);
    } else if ( xhttp.status != 200 ) {
      location = '27.9506,-82.4572'; //Tampa FL is the default location if auto-detect fails.
      // TODO - add something in the UI to indicate that this has happened.
      getWeather(location);
    }
  };
  
  xhttp.open("GET", url, true);
  xhttp.send();
}

//Call the WeatherUnderground API with user location
function getWeather(location) {
  var xhttp = new XMLHttpRequest();
  var url = "//api.wunderground.com/api/e1a96d287b019ea8/conditions/q/" + location + ".json";
  var sorry = 'There was an issue retreiving weather data. Please try again in a few minutes.';

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var data = JSON.parse(xhttp.responseText);
      if ( data.response.error ) {
        document.getElementsByClassName('data-container')[0].innerHTML = sorry;
      } else {      
        displayWeather(data);
      }
    }
  };
  
  xhttp.open("GET", url, true);
  xhttp.send();
}
  
//Display Weather Data to User
function displayWeather(data) {
  //Set Up Current Weather Object
  currentWeather = {
    conditionsIcon : data.current_observation.icon_url,
    conditions : data.current_observation.weather,
    tempF : data.current_observation.temp_f,
    tempC : data.current_observation.temp_c,
    location : data.current_observation.display_location.full,
    wind : data.current_observation.wind_string,
    attributionImg : data.current_observation.image.url
  }
  
  //Remove HTTP protocols from API provided URLs
  currentWeather.conditionsIcon = currentWeather.conditionsIcon.slice(5);
  currentWeather.attributionImg = currentWeather.attributionImg.slice(5);

  //Initial weather data to DOM elements
  document.getElementById("conditions").innerHTML = currentWeather.conditions + '<br />' + '<img src="' + currentWeather.conditionsIcon + '" alt="Local Weather Conditions" >';
  document.getElementById("value").innerHTML = currentWeather.tempF;
  document.getElementById("units").innerHTML = 'F';
  document.getElementById("change-units").innerHTML = "Change To Celcius";
  document.getElementById("location").innerHTML = currentWeather.location;
  document.getElementById("wind").innerHTML = "Wind <br />" + currentWeather.wind;
  document.getElementById("attribution").innerHTML = "Weather Data Provided By<br/> <a href=\"https://www.wunderground.com/?apiref=264ec09865b1713d\" target=\"_blank\"><img src=" + currentWeather.attributionImg + " alt=\"Weather Data Provided by WeatherUnderground\" /></a><br /><a href=\"http://jordancarney.com\" target=\"_blank\">Developer</a>";

  //Set backgrounds based on weather conditions
  var theBG = document.documentElement;
  if ( /thunderstorm/i.test(currentWeather.conditions) ) {
    theBG.className = 'thunderstorm';
  } else if ( /hail/i.test(currentWeather.conditions) || /ice/i.test(currentWeather.conditions) || /freezing/i.test(currentWeather.conditions) ){
        theBG.className = 'hail';
  } else if ( /drizzle/i.test(currentWeather.conditions) || /mist/i.test(currentWeather.conditions) || /spray/i.test(currentWeather.conditions) ){
        theBG.className = 'drizzle';
  } else if ( /snow/i.test(currentWeather.conditions) ){
        theBG.className = 'snow'; 
  } else if ( /fog/i.test(currentWeather.conditions) || /haze/i.test(currentWeather.conditions) ){
        theBG.className = 'fog';
  } else if ( /rain/i.test(currentWeather.conditions) ){
        theBG.className = 'rain';
  } else if ( /cloudy/i.test(currentWeather.conditions) || /clouds/i.test(currentWeather.conditions) ){
        theBG.className = 'cloudy';
  } else if ( /overcast/i.test(currentWeather.conditions) ){
        theBG.className = 'overcast';
  } else {
        theBG.className = 'def';
  }
}  

//Temperature Value Togglers
var changeTemp = document.getElementsByClassName('change-temp');
for (var i = 0; i < changeTemp.length; i++) {
  changeTemp[i].addEventListener('click', function(e){
    var units = document.getElementById("units");
    var value = document.getElementById("value");
    var temperatureButton = document.getElementById("change-units");
    if ( /f/i.test(units.innerHTML) ) {
        value.innerHTML = currentWeather.tempC;
        units.innerHTML = 'C';
        temperatureButton.innerHTML = "Change To Fahrenheit";
      } else {
        value.innerHTML = currentWeather.tempF;
        units.innerHTML = 'F';
        temperatureButton.innerHTML = "Change To Celcius";
      }
  });
}

//Build list of available cities for user selection
function buildCityList() {
  
  var cityListHeader = document.createElement('h3');
  cityListHeader.appendChild(document.createTextNode('Select Location'));
  
  var cityListContainer = document.getElementsByClassName('data-container');
  var cityList = document.createElement('div');
  cityList.id = 'city-list';
  var ul = document.createElement('ul');
  
  //Make reset selection first
  var resetLi = document.createElement('li');
  resetLi.appendChild(document.createTextNode('Auto-detect')); 
  ul.appendChild(resetLi);
  
  //Add all cities to the list
  for (var i = 0; i < cities.length; i++) {
    var li = document.createElement('li');
    var theCity = document.createTextNode(cities[i].city);
    li.appendChild(theCity);
    ul.appendChild(li);
  }
  cityList.appendChild(cityListHeader);
  cityList.appendChild(ul);
  
  //Send list to the DOM
  cityListContainer[0].appendChild(cityList);
  waitForSelection();
  
}

function waitForSelection() {
  //Attach event listeners for click
    var option = document.querySelectorAll('#city-list li')

    for (var i = 0; i<option.length; i++) {
      option[i].addEventListener('click', function(e) {
        var theSelection = e.target.innerHTML;
        var location = '';
        for (var i = 0; i < cities.length; i++) {
          if ( cities[i].city === theSelection ) {
            location = cities[i].lat + ',' + cities[i].long;
          } else if ( 'Auto-detect' === theSelection ) {
            getLocation();
          }
        }
        
        //Remove city list after selection
        var parent = document.getElementsByClassName('data-container');
        parent[0].removeChild(document.getElementById('city-list'));
        
        //Update weather info
        getWeather(location);
      });
    }
}

//Show list of cities for weather
document.getElementById('change-location').addEventListener('click', function() {
  buildCityList(cities);
});

//Run on Page Load
getLocation();

})();