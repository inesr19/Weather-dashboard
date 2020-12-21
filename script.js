    $('.searchBtn').click(function() {
    var cityName = $('.searchBar').val();
    var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=d9414f7879ddedfc3df78e947516ecc0';

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    });
    })
    
