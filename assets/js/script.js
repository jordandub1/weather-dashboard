$("document").ready(function(){
    // initial variables

    var city;
    var country;
    var cityName;
    var results;
    var currentTemp;
    var windSpeed;
    var humidity;
    var UVIndexText;
    var UVIndexColor;
    var iconW;
    var iconImage;
    var imageUrl;
    var lat;
    var lon;
    var dayTemps;
    var dayWind;
    var dayHumidity;
    var dayIcon;
    var dayImageUrl;
    var dayIconImage;
    var response;
    var resultsTwo;
    var date;
    var dayDate;
    var fiveDay;

    // current date
    var currentDay = "(" + moment().format('l') + ")";

    // event listener for search button
    $("#cityBtn").on("click", function(event) {
        event.preventDefault();
        $("#cityInfo").css("border", "solid lightgray 1px")
        clearInfo();
        var city = $("#city").val();
        getInfo(city);
        addCities(city);
    })

    // function to add cities to array
    function addCities(city) {
        var recentCities = JSON.parse(localStorage.getItem("History")) || [];
        recentCities.push(city);
        if (recentCities.length == 6) {
            recentCities.shift()
        }


        $("#recentSearches").html("");

        // for loop to add recent searches
        for (var i = 0; i < recentCities.length; i++) {
            localStorage.setItem("History", JSON.stringify(recentCities));
            var btn = $("<li class='list-group-item'>").html(recentCities[i]);
            $("#recentSearches").append(btn);
        }
    }

    // function to clear info
    function clearInfo() {
        $("#cityName").html("");
        $("#currentTemp").html("");
        $("#humidity").html("");
        $("#windSpeed").html("");
        $("#UVIndex").html("");

        $("#dayDate-4").html("");
        $("#dayIconImage-4").html("");
        $("#dayTemps-4").html("");
        $("#dayHumidity-4").html("");
        $("#dayWind-4").html("");
        $("weather-4").html("");

        $("#dayDate-12").html("");
        $("#dayIconImage-12").html("");
        $("#dayTemps-12").html("");
        $("#dayHumidity-12").html("");
        $("#dayWind-12").html("");
        $("weather-12").html("");

        $("#dayDate-20").html("");
        $("#dayIconImage-20").html("");
        $("#dayTemps-20").html("");
        $("#dayHumidity-20").html("");
        $("#dayWind-20").html("");
        $("weather-20").html("");

        $("#dayDate-28").html("");
        $("#dayIconImage-28").html("");
        $("#dayTemps-28").html("");
        $("#dayHumidity-28").html("");
        $("#dayWind-28").html("");
        $("weather-28").html("");

        $("#dayDate-36").html("");
        $("#dayIconImage-36").html("");
        $("#dayTemps-36").html("");
        $("#dayHumidity-36").html("");
        $("#dayWind-36").html("");
        $("weather-36").html("");
    }

    // function to get city from API
    function getInfo(city) {
        var city;
        // API URL for city
        var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        // API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            getMoreInfo(response);
            displayForecast(response);          
        })
    }

    // function to get info to display on page
    function getMoreInfo(response) {
        var results =  response;
        var iconW = results.weather[0].icon;
        var imageUrl = "http://openweathermap.org/img/w/" + iconW + ".png";
        var iconImage = $("<img>");
        iconImage.attr("src", imageUrl);
        var currentTemp = results.main.temp + " &#176;F";
        var humidity = results.main.humidity;
        var windSpeed = results.wind.speed + " MPH";
        var lat = results.coord.lat;
        var lon = results.coord.lon;
    
        // API URL for latitude and longitude
        var forecastURL= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

        // API call
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var resultsTwo = response;
            displayForecast(resultsTwo);
        


        var country = resultsTwo.city.country;
        var cityName = results.name + ", " + country + " " + currentDay;
    
        $("#cityName").append(cityName, iconImage);
        $("#currentTemp").append("Temperature: " + currentTemp);
        $("#windSpeed").append("Wind Speed: " + windSpeed);
        $("#humidity").append("Humidity: " + humidity + "%");

            // API URL for UV index
            var UVURL= "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=8391498daeaf403c89574dc9e5a777c7";

            // API Call
            $.ajax({
                url: UVURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                var UVIndexText = response.value;
                var UVIndex = $("<button type='button'>");

                if (parseInt(UVIndexText) < 3) {
                    var UVIndexColor = "btn btn-success";
                } else if (parseInt(UVIndexText) >= 3 && parseInt(UVIndexText) <= 5 ) {
                    var UVIndexColor = "btn btn-warning";
                } else if (parseInt(UVIndexText) > 5) {
                    var UVIndexColor = "btn btn-danger";
                }
                UVIndex.addClass(UVIndexColor);

                $("#UVIndex").append(("UV Index: "),(UVIndex.append(UVIndexText)));



            })
        })
    }

    // event listener to add recent searches to side bar
    $("#recentSearches").on("click", "li", function() {
        clearInfo();
        var city = $(this).html();
        getInfo(city);
        addCities(city);
    });

    // function to display 5-day forecast information
    function displayForecast(resultsTwo) {
        for (var i = 4; i < resultsTwo.list.length; i+=8) {
            var date = resultsTwo.list[i].dt;
            var dayDate = moment.unix(date).format("M/DD/YYYY");
            var dayTemps = "Temp: " + resultsTwo.list[i].main.temp + " &#176;F";
            var dayWind = "Wind: " + resultsTwo.list[i].wind.speed + " MPH";
            var dayHumidity = "Humidity: " + resultsTwo.list[i].main.humidity + "%";
            var dayIcon = resultsTwo.list[i].weather[0].icon;
            var dayImageUrl = "http://openweathermap.org/img/w/" + dayIcon + ".png";
            var dayIconImage = $("<img>");
            dayIconImage.attr("src", dayImageUrl);

            var fiveDay = "5-Day Forecast:";

            $("#h7").html(fiveDay);

            $("#dayDate-" + i).append(dayDate);
            $("#dayIconImage-" + i).append(dayIconImage);
            $("#dayTemps-" + i).append(dayTemps);
            $("#dayWind-" + i).append(dayWind);
            $("#dayHumidity-" + i).append(dayHumidity);
            $("#weather-" + i).css("background-color", "#5b7c99");
            
        }
    }
})