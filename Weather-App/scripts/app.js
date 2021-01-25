const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //Quicker Way (destructure properties), same as commented lines above
    const { cityDets, weather } = data;


    // Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null;
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    // Use ternary operation instead of the commented above
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // Remove the d-none (hide) class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
};

// const updateCity = async (city) => {
    // const cityDets = await getCity(city);
    // const weather = await getWeather(cityDets.Key);

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // };
    // We can use object short hand model bc key name is same as value name -->
    
    // return { cityDets, weather };
// };

cityForm.addEventListener('submit', e => {
    // prevent default action (refresh page)
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message));

    // Setting the local storage to the last city viewed
    localStorage.setItem('city', city);
});

// Setting a default city value = to the last city stored in local storage
if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city')) //This returns a promise, so we use .then to get actual data
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}