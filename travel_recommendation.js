const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

function thankyou(){
    resetForm();
    alert('Thank you for contacting us!');
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }