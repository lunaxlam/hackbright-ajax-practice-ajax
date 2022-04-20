'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then(response => response.text()
    .then(data => {
      // console.log(data)
      document.querySelector('#fortune-text').innerHTML = data
    }));
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  // weather.json?zipcode=98000
  const queryString = new URLSearchParams({zipcode}).toString();
  // const url = '/weather.json${queryString}';


  fetch(`${url}?${queryString}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      document.querySelector('#weather-info').innerHTML = data['forecast']
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
