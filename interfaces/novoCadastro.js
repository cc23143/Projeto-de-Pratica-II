function AddCadastro(){
    let Email     = document.getElementById('Email').value
    let Senha     = document.querySelector('#senha').value
    let Nome      = document.querySelector('#Name').value
    let Sobrenome = document.querySelector('#Sobrenome').value
    let Endereco  = document.querySelector('#Endereco').value
    let Sexo      = document.querySelector('#sexo').value
    let DataNasc  = document.querySelector('#data').value
    let data = new Date();
    axios.post(`http://localhost:7698/addCadastro`, {params:{
      email:       Email,
      senha:       Senha,
      nome:        Nome,
      sobrenome:   Sobrenome,
      endereco:    Endereco,
      sexo:        Sexo,
      dataNascDia: DataNasc.slice(0,4),
      dataNascMes: DataNasc.slice(5,7),
      dataNascAno: DataNasc.slice(8,10)
    }, headers:{
      "Content-type":"application/x-www-form-urlencoded; charset=UTF-8"
    }})
      .then(function (res) {
          console.log(res.data)
      })
      .catch(function (error) {
          console.error(error);
      })
}