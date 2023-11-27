function AddCadastro(){
    let Email     = document.getElementById('Email').value
    let Senha     = document.querySelector('#senha').value
    let Nome      = document.querySelector('#Name').value
    let Sobrenome = document.querySelector('#Sobrenome').value
    let Endereco  = document.querySelector('#Endereco').value
    let Sexo      = document.querySelector('#sexo').value
    let DataDia   = document.querySelector('#dataDia').value
    let DataMes   = document.querySelector('#dataMes').value
    let DataAno   = document.querySelector('#dataAno').value
    let data = new Date();
    axios.post(`http://localhost:7698/addCadastro`, {params:{
      email:       Email,
      senha:       Senha,
      nome:        Nome,
      sobrenome:   Sobrenome,
      endereco:    Endereco,
      sexo:        Sexo,
      dataNascDia: DataDia,
      dataNascMes: DataMes,
      dataNascAno: DataAno
    }})
      .then(function (res) {
          console.log(res.data[0].email)
      })
      .catch(function (error) {
          console.error(error);
      })
    
}