
$("#city-input").on("click", function () {
    var searchField = $("#add-city").val()
})
// This is our API key
var APIKey = "df395ec1744607ab8a94ec45d4c77c47";
var city = ""
// Here we are building the URL we need to query the database
function ajaxCalls() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Miami&appid=" + APIKey;


    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            var title = $("<h3>").addClass("card-title").text(response.name + "(" + new Date().toLocaleDateString() + ")")
            var card = $("<div>").addClass("card")
            var wind = $("<p>").addClass("card-text").text("windspeed;" + response.wind.speed + "mph")
            var humidity = $("<p>").addClass("card-text").text("humidity;" + response.main.humidity + "%")
            var temp = $("<p>").addClass("card-text").text("temperature;" + response.main.temp + "fahrenhiet")
            var lat = ""
            var long = ""


            var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&cnt=" + city + "&appid=" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {

                    // Log the queryURL
                    console.log(queryURL);

                    // Log the resulting object
                    console.log(response);

                    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=Miami&appid=" + APIKey;

                    // Here we run our AJAX call to the OpenWeatherMap API
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                        .then(function (response) {

                            // Log the queryURL
                            console.log(queryURL);

                            // Log the resulting object
                            console.log(response);

                            var cities = ["Reston", "San Antonio", "Miami", "Las Vegas"];
                            function renderButtons() {
                                $("#buttons-view").empty();
                                for (var i = 0; i < cities.length; i++) {
                                    var a = $("<button>");
                                    a.addClass("city");
                                    a.attr("data-name", cities[i]);
                                    a.text(cities[i]);
                                    $("#buttons-view").append(a);
                                }
                            }

                            $("#add-city").on("click", function (event) {

                                event.preventDefault();

                                var city = $("#city-input").val().trim();
                                cities.push(city);
                                renderButtons();
                            });

                        })
                })
        })
}
ajaxCalls()