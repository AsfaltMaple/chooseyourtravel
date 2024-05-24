const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

const username = document.getElementById('name');
const useremail = document.getElementById('email');
const usermessage = document.getElementById('message');

function thankyou(){
    resetForm();
    alert('Thank you for contacting us!');
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }

btnSearch.addEventListener("click", searchDestination);

function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
   // resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const destination = data.destinations.find(item => item.name.toLowerCase() === input);
        if (destination) {
            const countries = destination.countries.join(', ');
            const temples = destination.temples.join(', ');
            const beaches = destination.beaches;
  
            resultDiv.innerHTML += `<h2>${destination.country}</h2>`;
            //resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;
  
            resultDiv.innerHTML += `<p><strong>Countries:</strong> ${countries}</p>`;
            resultDiv.innerHTML += `<p><strong>Temples:</strong> ${temples}</p>`;
            resultDiv.innerHTML += `<p><strong>Beaches:</strong> ${beaches}</p>`;
          } else {
            resultDiv.innerHTML = 'Condition not found.';
          }
        })
}
console.log(searchDestination);