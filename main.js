const api = `&APPID=9a7d460b65f1722b8ee85a1b68cfc9ec`;

const submit = document.querySelector('#submit');
const search = document.querySelector('#search');
const current = document.querySelector('#current');
const results = document.querySelector('.results');

const dropdown = document.querySelector('.select');
const cities = ["Amsterdam", "Carbondale", "Melbourne", "Nijmegen", "San Diego", "Seattle"];
for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    dropdown.innerHTML += "<option value=\"" + city + "\">" + city + "</option>";
}

submit.addEventListener('click', (event) => {
    let userClick = document.querySelector('.select').value;

    event.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?&q=${userClick}&units=metric&${api}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            const temp = data.main.temp;
            const weather = data.weather[0].description;
            const options = {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric'
            };
            const date = new Date();
            const cityTime = date.toLocaleString("en-Au", options);

            document.getElementById("city").innerHTML = `Weather in ${userClick}`;
            document.getElementById("weather").innerHTML = `${weather}`;
            document.getElementById("date-time").innerHTML = `${cityTime}`;
            document.getElementById("temp").innerHTML = `${temp} °C`;
        });
});

search.addEventListener('click', (searchEvent) => {
    const userInput = document.querySelector('#input').value;
    searchEvent.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?&q=${userInput}&units=metric&${api}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            const temp = data.main.temp;
            const weather = data.weather[0].description;
            const options = {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric'
            };
            const date = new Date();
            const cityTime = date.toLocaleString("en-Au", options);

            document.getElementById("city").innerHTML = `Weather in ${userInput}`;
            document.getElementById("weather").innerHTML = `${weather}`;
            document.getElementById("date-time").innerHTML = `${cityTime}`;
            document.getElementById("temp").innerHTML = `${temp} °C`;
        });
});

current.addEventListener('click', (localEvent) => {
    localEvent.preventDefault();
    const localCord = navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&${api}`)
            .then(response => response.json())
            .then((data) => {
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                const options = {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric'
                };
                const date = new Date();
                const cityTime = date.toLocaleString("en-Au", options);

                document.getElementById("city").innerHTML = `Weather at lat: ${lat} long: ${long}`;
                document.getElementById("weather").innerHTML = `${weather}`;
                document.getElementById("date-time").innerHTML = `${cityTime}`;
                document.getElementById("temp").innerHTML = `${temp} °C`;
            });
    });
});