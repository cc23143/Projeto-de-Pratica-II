function addCardapio(){
    let arrayP = []
    let arrayB = []
    axios.get(`http://localhost:7698/getCardapioP`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayP[i] = JSON.parse(JSON.stringify(res.data[i]))
        }
        console.log(arrayP)
      })
      .catch(function (error) {
        console.error(error)
      })
    axios.get(`http://localhost:7698/getCardapioB`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayB[i] = JSON.parse(JSON.stringify(res.data[i]))
        }
        console.log(arrayB)
      })
      .catch(function (error) {
        console.error(error)
      })
    
}