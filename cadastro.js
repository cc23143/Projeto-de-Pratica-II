let Email = document.querySelector('#Email')
let Senha = document.querySelector('#Senha')
let sit   = false
let func  = '-1'
const VerifCadAPI = function(){
    const XML = new XMLHttpRequest()
    XML.onreadystatechange = function(){
        if(XML.readyState == 4 && XML.status == 200){
            func = XML.responseText
            sit = true
        }else if(XML.status == 404){
            func = "Error 404:page not found."
        }
    }
    if(sit){
        XML.open("get","http://localhost:7698/verifCadastro",true)
        XML.send()
    }
    console.log(func)
    console.log(sit)
}
function VerifCadastro(){
    VerifCadAPI()
    switch(func){
            case "gerente":
                
            case "cozinhero":

            case "entregador":

            case "garçom":  

            case "undefined" && "-1":

            default:
                
    }
}