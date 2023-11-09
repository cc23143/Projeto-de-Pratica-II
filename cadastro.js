let Email = document.getElementById('#Email')
let Senha = document.querySelector('#Senha')
let func  = '-1'

const VerifCadAPI = function(){
    const XML = new XMLHttpRequest()
    XML.onreadystatechange = function(){
        if(XML.readyState == 4 && XML.status == 200){
            func = XML.responseText
        }else if(XML.status == 404){
            func = "Error 404:page not found."
        }
    }
    XML.open("get","https://localhost:7698/verifCadastro",true)
    XML.send("?email=" + Email + "&senha=" + Senha)
    console.log(func + "\n" + XML.readyState + "\n" + XML.status)
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