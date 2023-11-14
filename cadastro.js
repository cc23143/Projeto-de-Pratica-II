let Email = document.querySelector('#Email')
let Senha = document.querySelector('#Senha')
let func  = '-1'


function VerifCadastro(){
    const axios = require('axios');

    axios.get(`http://localhost:7698/verifCadastro`, {params:{
      email: Email.value,
      senha: Senha.value
    }}) //?email=${Email.value}&senha=${Senha.value}
      .then(function (res) {
        console.log(res)
        switch(res){
            case "gerente":
                //window.location.replace('InterGerente.html')
            case "cozinhero":

            case "entregador":

            case "garçom":  

            case "undefined" || "-1" || "nothing" || null:
                //console.log("Não")
            default:
               //window.location.replace('InterCliente.html')
    }
        console.log(response);
      })
      .catch(function (error) {
        console.log("Não")
        console.error(error);
      })
    
}