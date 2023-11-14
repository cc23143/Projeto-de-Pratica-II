let Email = document.querySelector('#Email')
let Senha = document.querySelector('#Senha')
let func  = '-1'


async function VerifCadastro(){
    import axios from 'axios';
    try {
      const res = await axios.get(`/http://localhost:7698/verifCadastro?email=${Email.value}&senha=${Senha.value}`);
      /*switch(res){
        case "gerente":
            //window.location.replace('InterGerente.html')
        case "cozinhero":
        case "entregador":
        case "garçom":  
        case "undefined" || "-1" || "nothing" || null:
            
        default:
           //window.location.replace('InterCliente.html')
      }*/
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }