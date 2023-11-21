const PostAPI = function(body){
    let XMLHttpRequest = require("xmlhttprequest");
    const xhl = new XMLHttpRequest()
    xhl.open("POST","http://localhost:7698/addCadastro")
    xhl.send(body)
}
function CriarCadastro(){
    let Email       = document.querySelector('#Email').value
    let Senha       = document.querySelector('#senha').value
    let Nome        = document.querySelector('#Name').value
    let Sobrenome   = document.querySelector('#Sobrenome').value
    let dataNascAno = document.querySelector('#dataAno').value 
    let dataNascMes = document.querySelector('#dataMes').value 
    let dataNascDia = document.querySelector('#dataDia').value
    let Sexo        = document.querySelector('#sexo').value
    let endereco    = document.querySelector('#Endereco').value
    console.log(Email + "/-/" + Senha + "/-/" + Nome + "/-/" + Sobrenome + "/-/" + dataNascDia + "-" + dataNascMes + "-" + dataNascAno + "/-/" + Sexo)
    const body = JSON.stringify({
        nome: Nome,
        sobrenome: Sobrenome,
        email: Email,
        senha: Senha,
        sexo: Sexo,
        endereco: endereco,
        dataNascDia: dataNascDia,
        dataNascMes: dataNascMes,
        dataNascAno: dataNascAno
    })
    PostAPI(body)
}