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
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const destination = data.destinations.countries.find(item => item.name.toLowerCase() === input);
        console.log(data.destination);
        
        //(item => item.name.toLowerCase() === input);
        if (destination) {
           // const countryname = destination.countries.name.join(', ');
            const countrycitiesname = destination.countries.cities.name.join(', ');
            const countrycitiesimg = destination.countries.cities.imageUrl.join(', ');
            const countrycitiesdesc = destination.countries.cities.description.join(', ');
            
            //const beaches = destination.beaches;
  
            resultDiv.innerHTML += `<h2>${destination.country}</h2>`;
            //resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;
  
            resultDiv.innerHTML += `<p><strong>Countries:</strong> ${countrycitiesname}</p>`;
            resultDiv.innerHTML += `<p><strong>Temples:</strong> ${temples}</p>`;
            resultDiv.innerHTML += `<p><strong>Beaches:</strong> ${beaches}</p>`;
          } else {
            resultDiv.innerHTML = 'Condition not found.';
          }
        })
}
