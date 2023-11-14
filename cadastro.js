


function VerifCadastro(){
    import axios from 'axios';
    let Email = document.getElementById('#Email')
    let Senha = document.querySelector('#Senha')
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

            case "undefined" || "-1" || "nothing":
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