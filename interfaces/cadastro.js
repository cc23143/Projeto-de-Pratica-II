


function VerifCadastro(){
    let Email = document.getElementById('Email').value
    let Senha = document.querySelector('#Senha').value
    axios.get(`http://localhost:7698/verifCadastro`, {params:{
      email: Email,
      senha: Senha
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