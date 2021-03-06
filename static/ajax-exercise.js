'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // Go to this route and get the Response object
  fetch('/fortune')
    // From the Response object, get the text of the Response object
    .then(response => response.text())
    // Assign the text form of the Response object ('data) as the innerHTML
    .then(data => {
      document.querySelector('#fortune-text').innerHTML = data;
    }
    )
}

// Define the Event Listener
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
      console.log(data);
      // Set the innerHTML as the value at data['forecast']
      document.querySelector('#weather-info').innerHTML = data['forecast'];
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data['msg']);

      if (data['code'] === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
        document.querySelector('#order-status').innerHTML = `<p class="order_msg">${data['msg']}</p>`;
      }
      else {
        document.querySelector('#order-status').classList.remove('order-error');
        document.querySelector('#order-status').innerHTML = `<p class="order_msg">${data['msg']}</p>`;
      }
    })


  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);

// FURTHER STUDY: SHOW A DOG

function showDog(evt) {
  fetch('https://dog.ceo/api/breeds/image/random')
    // From the Response object, get the JSON of the Response object
    .then(response => response.json())
    // From the JSON access the value of the .message property
    .then(data => {
      const imageURL = data.message;
      // Create a new <div></div> and <img> element and set the src for <img> the image URL
      document.querySelector('#dog-image').insertAdjacentHTML('beforeend', `<div><img src=${imageURL}></div>`);
    });
}

document.querySelector('#get-dog-image').addEventListener('click', showDog);
