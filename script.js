function displayInfo(cityName) {
    const apiKey = 'd9414f7879ddedfc3df78e947516ecc0'
    const queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        // Grabing coordinates for second and third ajax call.
        displayIndex(response.coord.lat, response.coord.lon);
        dailyWeather(response.coord.lat, response.coord.lon);

        // Display city name
        $('.city').text(response.name);

        // Display current weather icon
        const iconImage = response.weather[0].icon
        const iconImageUrl = 'http://openweathermap.org/img/wn/' + iconImage + '@2x.png'
        $('<img>', {
            src: iconImageUrl
        }).appendTo('.city');

        // Display temperature in Fahrenheit
        $('.temp').text('Temperature(F): ' + response.main.temp + '\u00B0');
        // Display humidity percentage
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        // Display wind speed mph
        $('.wind').text('Wind Speed: ' + response.wind.speed + 'mph');

        // Local storage for searched cities
        localStorage.setItem('city', cityName);
    });
}

// Generate button for every city search and display weather info
$('.btn').on('click', function () {
    var city = $('.searchBar').val();
    const btn = $(`<button class="btn city-search">${city}</button>`);
    $('#city-list').append(btn);

    displayInfo(city);
});

// Display weather info when generated city button is clicked
function handleCityListClick() {
    const cityNameFromBtn = $(this).text();

    displayInfo(cityNameFromBtn);
}

$(document).on('click', ".city-search", handleCityListClick);

function displayIndex(lat, lon) {
    var apiKey = 'd9414f7879ddedfc3df78e947516ecc0'
    var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&units=imperial&appid=' + apiKey;

    // AJAX call for UV Index
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        $('.uv-index').text('UV Index: ' + response.current.uvi);
        if (response.current.uvi <= 2) {
            $('.uv-index').addClass('low');
        } else if (response.current.uvi > 3 || response.current.uvi == 8) {
            $('.uv-index').addClass('moderate');
        } else if (response.current.uvi > 8) {
            $('.uv-index').addClass('high');
        }
    });
}

function dailyWeather(lat, lon) {
    var apiKey = 'd9414f7879ddedfc3df78e947516ecc0'
    var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial&appid=' + apiKey;

    // AJAX call for UV Index
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        $('.container-day').empty();
        // Display mm/dd/yyyy for 5 day forecast
        for (let i = 1; i < 6; i++) {
            const unixTime = response.daily[i].dt
            const date = new Date(unixTime * 1000);
            const newDate = date.toLocaleDateString("en-US");

            // Display png icon of daily forecast
            const iconId = response.daily[i].weather[0].icon
            const iconUrl = 'http://openweathermap.org/img/wn/' + iconId + '@2x.png';

            // 5 day forecast displayed information
            $('<div>', {
                text: `${newDate}`
            }).append($('<img>', {
                src: iconUrl
            })).append($('<div>', {
                text: 'Temperature(F): ' + response.daily[i].temp.day + '\u00B0'
            })).append($('<div>', {
                text: 'Humidity: ' + response.daily[i].humidity + '%',
            })).appendTo('.container-day');
        }
    });
}
