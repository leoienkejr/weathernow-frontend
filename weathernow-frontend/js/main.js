window.onload = function(){
    const default_locations = ['tokyo', 'new york', 'london', 'sao paulo', 'beijing'];
    const location =  default_locations[Math.floor(Math.random() * default_locations.length)];
    const api_request_url = generateApiRequestURL(location);
    console.log(api_request_url);
    callApi(api_request_url);
}

function generateApiRequestURL(location_str){
    const api_url = 'https://leoienkejr-weathernow.herokuapp.com/api/bycityname/';
    return api_url.concat(location_str);
}

async function callApi(request_url){
    fetch(request_url).then(response => {
        response.json().then(json_data => {
            updatePage(json_data);
        })
    })
}

function updatePage(weather_data){
    if (weather_data['response_code'] == '!200'){
        return null;
    }

    location_str = weather_data['city'].concat(', ', weather_data['country']);
    document.getElementById('location').innerHTML = location_str;

    celsius_symbol = '<span id="celsius-symbol">°</span><span id="celsius-symbol-c">C</span>'
    temperature_celsius = Math.trunc(weather_data['temp'] - 273.15);
    document.getElementById('temperature').innerHTML = temperature_celsius.toString().concat(celsius_symbol)

    main_weather = weather_data['main_weather'];
    document.getElementById('weather-status').innerHTML = main_weather;
}