// OpenweatherAPI
$(document).ready(function () {
    var APIKey = "df395ec1744607ab8a94ec45d4c77c47";
    var searchedCity = "";
    var queryURL;
    // var searchedCity = "";
    $(".city-name").text(searchedCity);
    $('#search-btn').click(function () {
        console.log("search button clicked");
        searchedCity = $('#searchedcity').val();
        console.log(searchedCity);
        getLatLon(searchedCity);
    });
    function displayPresentCityInformation(cityData, cityName) {
        console.log(cityData);
        var currentCityInfo = $('.current-city-info');
        var temperature = $('<p class="temp"></p>').text("Temperature: " + cityData.current.temp + "K");
        var humidity = $('<p class="temp"></p>').text("Humidity: " + cityData.current.humidity + "%");
        currentCityInfo.append($(".city-name").text(cityName), temperature, humidity);
    }
    // Takes in latitude and longitude, and makes a API call, and displays response information
    function searchCity(cityName, lat, lon) {
        queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log("extended information");
            // console.log(response);
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
    // $(".search-btn").on("click", function () {
});