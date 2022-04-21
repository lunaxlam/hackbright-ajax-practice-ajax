'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // Go to this route and get the Response object
  fetch('/fortune')
    // Convert the Response object into only text
    .then(response => response.text()
    // Assign the text form of the Response object ('data) as the innerHTML
    .then(data => {
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
  const queryString = new URLSearchParams({'zipcode' : zipcode}).toString();


  // Go to this URL and get the Response object
  fetch(`${url}?${queryString}`)
    // Convert the response object into JSON
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Set the innerHTML as the value at data['forecast']
      document.querySelector('#weather-info').innerHTML = `<p class="msg">${data['forecast']}</p>`
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value
  }
  
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(req => req.json())
    .then(data => {
      if (data['code'] === 'ERROR') {
        // document.querySelector('#order-status').classList.add('order-error'); 
        document.querySelector('#order-status').innerHTML = `<p class="msg order-error">${data['msg']}</p>`
      }
      else {
        document.querySelector('#order-status').innerHTML = `<p class="msg">${data['msg']}</p>`
      }
    })
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);

// PART 4: DOGS

function showDogImage(evt) {
  evt.preventDefault();

  fetch('https://dog.ceo/api/breeds/image/random')
  .then(req => req.json())
  .then(data => {
    console.log(data['message'])
    document.querySelector('#dog-image').innerHTML = `<img src="${data['message']}">`
  })
}

document.querySelector('#get-dog-image').addEventListener('click', showDogImage)