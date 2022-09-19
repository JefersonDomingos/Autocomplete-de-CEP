const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

// validar cep permitir somente numeros
cepInput.addEventListener("keypress", (e) => {
   
    const apenasNumeros = /[0-9]/;  
    const key = String.fromCharCode(e.keyCode);
    if(!apenasNumeros.test(key)){
        e.preventDefault();
        return;
    }
});

//pegar o endereço através de um evento

cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    if(inputValue.length === 8){
        getAddress(inputValue);
       
    }
});

//Pegar endereço pelo cep usando uma API

const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
}

//mostrar ou ocultar o carregamento da API

const toggleLoader = () => {
    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}


    
    






