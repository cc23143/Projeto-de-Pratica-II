//https://developer.mozilla.org/pt-BR/docs/Web/API/Window/sessionStorage


function VerifCadastro(){
    let Email = document.getElementById('Email').value
    let Senha = document.querySelector('#Senha').value
    axios.get(`http://localhost:7698/verifCadastro`, {params:{
      email: Email,
      senha: Senha
    }})
      .then(function (res) {
        console.log(res)
        console.log(res.data[0].func)
        console.log(res.data[0].nome)
        if(res.data[0].func != null && res.data[0].func != undefined){
          switch(res.data[0].func){
            case "gerente":

                //https://developer.mozilla.org/pt-BR/docs/Web/API/Window/sessionStorage
                sessionStorage.setItem("id", "" + res.data[0].idFunc);
                window.location.replace('InterGerente.html')
            case "cozinhero":

            case "entregador":

            case "garçom":  

            default:
              console.error("Algo deu errado!")
          }
        }else{
          if(res.data[0].nome != null && res.data[0].nome != undefined){
            switch(res.data[0].nome){
              case "undefined" || "-1" || "nothing" || "" || "null":
                  window.alert("Houve um erro ao cadastrar! verifique o email e a senha")
              default:
                  sessionStorage.setItem("id", "" + res.data[0].idCliente);
                  window.location.replace('interCliente.html')
                  sessionStorage.setItem("id", "" + res.data[0].idCliente);
                  sessionStorage.setItem("NumProd","0")
            }
        }
      }})
      .catch(function (error) {
        console.log("Não")
        console.error(error);
      })
    
}