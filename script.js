    $('.searchBtn').click(function() {
    var cityName = $('.searchBar').val();
    var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=d9414f7879ddedfc3df78e947516ecc0';

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response)

       var tempFar = (response.main.temp - 273.15) * 1.80 + 32;
       $('.temp').text('Temperature(F): ' + tempFar.toFixed(2) + '\u00B0');

       $('.humidity').text('Humidity: ' + response.main.humidity + '%');

       $('.wind').text('Wind Speed: ' + response.wind.speed + 'mph');
    });
    })
    
