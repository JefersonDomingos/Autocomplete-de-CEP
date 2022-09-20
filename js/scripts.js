const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");

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
    
    //parte do erro e reset() quando acontecer um erro
    
    if(data.erro === "true"){ 
        if(!addressInput.hasAttribute("disabled")){
            toggleDisabled();
        }

        addressForm.reset(); 
        toggleLoader(); 
        toggleMessage("CEP inválido. verifque e tente novamente."); 
        return; 
    }

    if(cityInput.value === ""){
        toggleDisabled();
    }

    addressInput.value = data.logradouro;
    cityInput.value = data.localidade;
    neighborhoodInput.value = data.bairro;
    regionInput.value = data.uf;

    toggleLoader(); 

}

//Adicionar e remover atributo disabled

const toggleDisabled = () => {
    if(regionInput.hasAttribute("disabled")){
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else{ 
        formInputs.forEach((input) => {
        input.setAttribute("disabled", "disabled");
        });
    }    
}

//mostrar ou ocultar o carregamento da API

const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}

 //retornar mensagem de erro

const toggleMessage = (msg) => { 
    const messageElement = document.querySelector("#message"); 
    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg; 

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide"); 
};

//fechar a mensagem 

closeButton.addEventListener("click", () => toggleMessage());

//Cadastrando o endereço 

addressForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    toggleLoader(); 

    setTimeout(() => {
        toggleLoader(); 
        
        toggleMessage("Cadastrado com sucesso");

        addressForm.reset(); 

        toggleDisabled(); 

    },1500)
});
    






