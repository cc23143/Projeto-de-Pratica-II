let Email = document.querySelector('#Email')
let Senha = document.querySelector('#Senha')


function VerifCadastro(){
    let String = "";
    let sql = ""
    switch(func){
            case "gerente":
                window.location.replace('InterGerente.html')
            case "cozinhero":

            case "entregador":

            case "garçom":  

            case "undefined" && "-1":

            default:
                window.location.replace('InterCliente.html')

    }
}