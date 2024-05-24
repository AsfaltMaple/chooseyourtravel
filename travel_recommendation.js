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
        //data.conditions.find(item => item.name.toLowerCase() === input);
        const country = data.countries.find(item => item.name.toLowerCase() === input);
        console.log(country);
        
        //(item => item.name.toLowerCase() === input);
        if (country) {
           // const countryname = destination.countries.name.join(', ');
            const countrycitiesname = data.countries.cities.join(', ');
            console.log(countrycitiesname);
            const countrycitiesimg = destination.countries.cities.imageUrl.join(', ');
            const countrycitiesdesc = destination.countries.cities.description.join(', ');
            
            //const beaches = destination.beaches;
  
            resultDiv.innerHTML += `<h2>${destination.country}</h2>`;
            //resultDiv.innerHTML += `<img src="${destination.imagesrc}" alt="hjh">`;
  
            resultDiv.innerHTML += `<p><strong>Countries:</strong> ${country}</p>`;
            resultDiv.innerHTML += `<p><strong>Temples:</strong> ${countrycitiesimg}</p>`;
            resultDiv.innerHTML += `<p><strong>Beaches:</strong> ${countrycitiesdesc}</p>`;
          } else {
            resultDiv.innerHTML = 'Condition not found.';
          }
        })
}
