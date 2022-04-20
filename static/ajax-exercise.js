'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // Go to this route and get the Response object
  fetch('/fortune')
    // From the Response object, get the text of the Response object
    .then(response => response.text()
    // Assign the text form of the Response object ('data) as the innerHTML
    .then(data => {
      // console.log(data)
      document.querySelector('#fortune-text').innerHTML = data
    }));
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  // Prevent the default HTML from rendering
  evt.preventDefault();

  // Define the base URL for fetching
  const url = '/weather.json';
  // Get the value we need for the query-string to concatenate to the base URL
  const zipcode = document.querySelector('#zipcode-field').value;
  // Example of what the URL should look like: weather.json?zipcode=98000
  // Create the query string with the given value and convert toString() if necessary
  const queryString = new URLSearchParams({zipcode}).toString();


  // Go to this URL and get the Response object
  fetch(`${url}?${queryString}`)
    // From the Response object, get the JSON of the Response object
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Set the innerHTML as the value at data['forecast']
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
