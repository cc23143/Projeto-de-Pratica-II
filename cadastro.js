let Email = document.getElementById('#Email')
let Senha = document.querySelector('#Senha')
let func  = '-1'


function VerifCadastro(){
    const axios = require('axios');

    // Faz uma requisição a um usuarío com um ID expecifico
    axios.get(`http://localhost:7698/verifCadastro?email=${Email.value}&senha=${Senha.value}`)
      .then(function (res) {
        switch(res){
            case "gerente":
                window.location.replace('InterGerente.html')
            case "cozinhero":

            case "entregador":

            case "garçom":  

            case "undefined" || "-1" || "nothing":
                console.log("Não")
            default:
                window.location.replace('InterCliente.html')
    }
        console.log(response);
      })
      .catch(function (error) {
        console.log("Não")
        console.error(error);
      })
    
}