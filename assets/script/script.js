// OpenweatherAPI
$(document).ready(function () {
    var APIKey = "df395ec1744607ab8a94ec45d4c77c47";
    var searchedCity = "";
    var queryURL;
    var dayGlobal = moment().format("M/D/YY");
    var searchHistoryArr = [""];
    // var searchedCity = "";
    $(".city-name").text(searchedCity);
    $('#search-btn').click(function () {
        console.log("search button clicked");
        searchedCity = $('#searchedcity').val();
        console.log(searchedCity);
        getLatLon(searchedCity);
    });
    // Creates a button with the name of current city and places it in search history
    function addCityToSearchHistory(cityName) {
        searchHistoryArr.push(cityName);
        var searchHistory = $('.search-history');
        var cityBtn = $(`<button type="button" class="btn btn-success col-12" data-city="${cityName}">${cityName}</button>`);
        searchHistory.append(cityBtn);
    }
    // Displays current city information
    function displayPresentCityInformation(cityData, cityName) {
        console.log(cityData);
        var currentCityInfo = $('.current-city-info');
        var cityNameDisplay = $('<p class="city-name"></p>').text(cityName);
        var date = $('<span class="date"></span>').text(dayGlobal);
        cityNameDisplay.append(" ");
        cityNameDisplay.append(date);
        var temperature = $('<p class="temp"></p>').text("Temperature: " + cityData.current.temp + "K");
        var humidity = $('<p class="humidity"></p>').text("Humidity: " + cityData.current.humidity + "%");
        var windSpeed = $('<p class="wind-speed"></p>').text("Wind speed: " + cityData.current.wind_speed + "MPH");
        var uvIndex = $('<p class="uvIndex"></p>').text("UV Index: " + cityData.current.uvi);
        var icon = $("<img class='icon'>").attr("src", `http://openweathermap.org/img/w/${cityData.current.weather[0].icon}.png`);
        cityNameDisplay.append(icon);
        //Add a button to the search history which has the name of the current city that is being searched.
        if (!searchHistoryArr.includes(cityName)) {
            addCityToSearchHistory(cityName);
        }
        currentCityInfo.empty();
        currentCityInfo.append(cityNameDisplay, temperature, humidity, windSpeed, uvIndex);
        //Add daily weather forecast for 5 days
        for (var day = 1; day < 6; day++) {
            addDailyForecast(day, cityData);
        }
    }
    // Adding daily forecast 
    function addDailyForecast(day, cityData) {
        var date = moment().add(day, 'days').format("M/D/YY");
        var dateDisplay = $('<p class="forecast-date"></p>').text(date);
        var temp = $('<p class="daily-temp"></p>').text(`Temp: ${cityData.daily[day].temp.day}K`);
        var humidity = $('<p class="daily-temp"></p>').text(`Humidty: ${cityData.daily[day].humidity}%`);
        var icon = $("<img class='icon'>").attr("src", `http://openweathermap.org/img/w/${cityData.daily[day].weather[0].icon}.png`);
        $(`*[data-day=${day}]`).empty();
        $(`*[data-day=${day}]`).append(date, icon, temp, humidity);
    }
    // Takes in latitude and longitude, and makes a API call, and displays response information
    function searchCity(cityName, lat, lon) {
        queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log("extended information");
            console.log(response);
            // Take the response and display current city information
            displayPresentCityInformation(response, cityName);
            // From the reponse display 5-day forecast
        });
    }
    // This function, accepts a name of a city and returns the lat lon information of that city
    function getLatLon(searchedCity) {
        console.log(searchedCity);
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${APIKey}`;
        //Take the city name, send it to OpenweatherAPI server
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log("Lat " + response.coord.lat);
            console.log("Lon " + response.coord.lon);
            searchCity(response.name, response.coord.lat, response.coord.lon);
        });
        //Using the JSON received from OpenweatherAPI display values in appropriate boxes.
    }
    $('.search-history').on('click', '.btn-success', function () {
        console.log($(this).data('city') + " was clicked");
        getLatLon($(this).data('city'));
    });
});