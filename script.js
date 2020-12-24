
function displayInfo(cityName) {
    var cityName = $('.searchBar').val();
    var apiKey = 'd9414f7879ddedfc3df78e947516ecc0'
    var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // Grabing coordinates for second ajax call.
        displayIndex(response.coord.lat, response.coord.lon);
        // Converting kelvins into fahrenheit  and displaying it.
        var tempFar = (response.main.temp - 273.15) * 1.80 + 32;
        $('.temp').text('Temperature(F): ' + tempFar.toFixed(2) + '\u00B0');
        // Display humidity
        $('.humidity').text('Humidity: ' + response.main.humidity + '%');
        // Display wind speed
        $('.wind').text('Wind Speed: ' + response.wind.speed + 'mph');
    });
}

$('.searchBtn').on('click', displayInfo);


 function displayIndex(lat, lon) {
     var apiKey = 'd9414f7879ddedfc3df78e947516ecc0'
     var queryUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&appid=' + apiKey;
    // AJAX call for UV Index
     $.ajax({
         url: queryUrl,
         method: "GET"
     }).then(function (response) {
         console.log(response)
         $('.uv-index').text('UV Index: ' + response.current.uvi);
     });
 }
