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
        // достаем все страны и сохраняем в перменную
        let countries = data.countries;
        // удаляем из начального объекта страны в таком виде в каком они там лежат
        delete data.countries;
        // добавляем в дату пустой ключ для стран
        data.countries = [];
        countries.forEach(it =>{
            // каждую страну добавляем как отдельный ключ
            data[it.name.toLowerCase()] = it.cities;
            // а так же все города из всех стран запихиваем в один большой массив
            it.cities.forEach(city =>{
                data.countries.push(city);
            })
        });

        // берем все ключи из даты
        let keys = Object.keys(data);
        // ищем ключ который содержит инпут
        let key = keys.find(keyWord => {
                let lowerKey = keyWord.toLowerCase();
                let isSubString = lowerKey.indexOf(input) > -1;
                return isSubString;
        })
        
        if (data[key]) { 
            // берем все обхекты по искомому ключу и пихаем их в див 
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
