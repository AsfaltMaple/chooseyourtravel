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
        let cities = data.countries;
        delete data.countries;
        data.countries = Array();
        cities.forEach(it =>{
            data[it.name.toLowerCase()] = it;
            it.cities.forEach(city => {
                data.countries += city;
            }) 
        });

        let keys = Object.keys(data);
        let key = keys.find(keyWord => {
                let lowerKey = keyWord.toLowerCase();
                let isSubString = lowerKey.indexOf(input) > -1;
                return isSubString;
        })
        
        if (data[key]) {  
            data[key].map(obj => {
                let curDiv = '<div>';
                curDiv += `<img src="${obj.imageUrl}" alt="hjh">`;
                curDiv += `<h2>${obj.name}</h2>`;
                curDiv += `<p>${obj.description}</p>`;
                curDiv += '</div>'
                resultDiv.innerHTML += curDiv;
            });
          } else {
            resultDiv.innerHTML = 'Location not found.';
          }
        });
        document.getElementById("destinationInput").value = "";
        
}
