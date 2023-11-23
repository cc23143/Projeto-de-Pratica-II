


function VerifCadastro(){
    let Email = document.getElementById('Email').value
    let Senha = document.querySelector('#Senha').value
    axios.get(`http://localhost:7698/verifCadastro`, {params:{
      email: Email,
      senha: Senha
    }}) //?email=${Email.value}&senha=${Senha.value}
      .then(function (res) {
        console.log(res)
        console.log(res.data[0].func)
        console.log(res.data[0].nome)
        if(res.data[0].func != null && res.data[0].func != undefined){
          switch(res.data[0].func){
            case "gerente":
                window.location.replace('InterGerente.html')
            case "cozinhero":

            case "entregador":

            case "garçom":  

            default:
              if(res.data[0].nome != null && res.data[0].nome != undefined){
                switch(res.data[0].nome){
                  case "undefined" || "-1" || "nothing" || "":
                      window.alert("Houve um erro ao cadastrar! verifique o email e a senha")
                  default:
                      window.location.replace('interCliente.html')
                }
              }
          }
        } 
      })
      .catch(function (error) {
        console.log("Não")
        console.error(error);
      })
    
}