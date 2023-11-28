function addCardapio(){
    let arrayP = []
    let arrayB = []
    axios.get(`http://localhost:7698/getCardapioP`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayP[i] = JSON.parse(res.data[i])
        }
        console.log(arrayP)
      })
      .catch(function (error) {
        console.error(error)
      })
    
}