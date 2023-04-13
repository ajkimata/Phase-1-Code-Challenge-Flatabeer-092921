// Code here
// // get references to the relevant HTML elements
// const beerName = document.getElementById('beer-name');
// const beerImage = document.getElementById('beer-image');
// const beerDescription = document.getElementById('beer-description');
// const reviewList = document.getElementById('review-list');

// // make a GET request to the API endpoint
// fetch('http://localhost:3000/beers/1')
//   .then(response => response.json())
//   .then(data => {
//     // update the HTML elements with the response data
//     beerName.innerText = data.name;
//     beerImage.src = data.image_url;
//     beerDescription.innerText = data.description;

//     // create a new list item for each review and append it to the review list
//     data.reviews.forEach(review => {
//       const li = document.createElement('li');
//       li.innerText = review;
//       reviewList.appendChild(li);
//     });
//   })
//   .catch(error => console.error(error));

// // get a reference to the beer list in the navigation menu
//   const beerList = document.getElementById('beer-list');


// function fetchBeers() {
//   fetch('/beers')
//     .then(response => response.json())
//     .then(beers => {
//       // Loop through the beers and create an <li> element for each one
//       beers.forEach(beer => {
//         const li = document.createElement('li');
//         li.innerText = beer.name;
//         li.addEventListener('click', () => showBeerDetails(beer.id));
//         beerList.appendChild(li);
//       });
//     })
//     .catch(error => console.error(error));
// }

// fetchBeers();



// function showBeerDetails(beerId) {
//   // Make a GET request to retrieve the beer details and populate the HTML elements with the data
//   fetch(`/beers/${beerId}`)
//     .then(response => response.json())
//     .then(beer => {
//       const beerName = document.getElementById('beer-name');
//       const beerImage = document.getElementById('beer-image');
//       const beerDescription = document.getElementById('beer-description');
//       const reviewList = document.getElementById('review-list');

//       beerName.innerText = beer.name;
//       beerImage.src = beer.image_url;
//       beerImage.alt = beer.name;
//       beerDescription.innerText = beer.description;

//       // Remove any existing reviews from the <ul> element
//       while (reviewList.firstChild) {
//         reviewList.removeChild(reviewList.firstChild);
//       }

//       // Add each review as a <li> element in the <ul> element
//       beer.reviews.forEach(review => {
//         const li = document.createElement('li');
//         li.innerText = review;
//         reviewList.appendChild(li);
//       });
//     })
//     .catch(error => console.error(error));
// }
// fetchBeers();


// get references to the relevant HTML elements
const beerName = document.getElementById('beer-name');
const beerImage = document.getElementById('beer-image');
const beerDescription = document.getElementById('beer-description');
const reviewList = document.getElementById('review-list');
const beerList = document.getElementById('beer-list');
const reviewForm = document.getElementById('review-form');

function fetchBeerDetails(beerId) {
  // make a GET request to the API endpoint
  fetch(`http://localhost:3000/beers/${beerId}`)
    .then(response => response.json())
    .then(data => {
      // update the HTML elements with the response data
      beerName.innerText = data.name;
      beerImage.src = data.image_url;
      beerDescription.innerText = data.description;

      // create a new list item for each review and append it to the review list
      reviewList.innerHTML = '';
      data.reviews.forEach(review => {
        const li = document.createElement('li');
        li.innerText = review;
        reviewList.appendChild(li);
      });
    })
    .catch(error => console.error(error));
}

function fetchBeers() {
  fetch('http://localhost:3000/beers/')
    .then(response => response.json())
    .then(beers => {
      // Loop through the beers and create an <li> element for each one
      beers.forEach(beer => {
        if(beer.name){
            const li = document.createElement('li');
            li.innerText = beer.name;
            li.addEventListener('click', () => {
            fetchBeerDetails(beer.id);
        });
        beerList.appendChild(li);
        }
      });
    })
    .catch(error => console.error(error));
}

function addReview(event) {
  event.preventDefault();
  const reviewInput = document.getElementById('review-input');
  const beerId = beerName.dataset.id;
  const review = reviewInput.value;

  fetch(`http://localhost:3000/beers/${beerId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ review })
  })
    .then(response => response.json())
    .then(data => {
      // update the review list with the new review
      const li = document.createElement('li');
      li.innerText = data.review;
      reviewList.appendChild(li);

      // clear the review input field
      reviewInput.value = '';
    })
    .catch(error => console.error(error));
}

fetchBeerDetails(1);
fetchBeers();

// add event listener to the review form submission event
reviewForm.addEventListener('submit', addReview);
