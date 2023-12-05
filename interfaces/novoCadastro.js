function AddCadastro(){
    let Email     = document.getElementById('Email').value
    let Senha     = document.querySelector('#senha').value
    let Nome      = document.querySelector('#Name').value
    let Sobrenome = document.querySelector('#Sobrenome').value
    let Endereco  = document.querySelector('#Endereco').value
    let Sexo      = document.querySelector('#sexo').value
    let DataNasc  = document.querySelector('#data').value
    console.log(Email    )
    console.log(Senha    )
    console.log(Nome     )
    console.log(Sobrenome)
    console.log(Endereco )
    console.log(Sexo     )
    console.log(DataNasc )
    console.log(DataNasc.slice(0,4))
    let data = new Date();
    axios.post(`http://localhost:7698/addCadastro?email=${Email}&senha=${Senha}&nome=${Nome}&sobrenome=${Sobrenome}&sexo=${Sexo}&dataNascDia=${DataNasc.slice(8,10)}&dataNascMes=${DataNasc.slice(5,7)}&dataNascAno=${DataNasc.slice(0,4)}&endereco=${Endereco}`)
      .then(function (res) {
          console.log(res)
      })
      .catch(function (error) {
          console.error(error);
      })
}