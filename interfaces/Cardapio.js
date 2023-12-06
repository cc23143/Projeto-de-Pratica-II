function addCardapio(){
    let arrayP = []
    let arrayB = []
    let arrayI = []
    axios.get(`http://localhost:7698/getCardapioP`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayP[i] = JSON.parse(JSON.stringify(res.data[i]))
        }
      })
      .catch(function (error) {
        console.error(error)
      })
    axios.get(`http://localhost:7698/getCardapioB`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayB[i] = JSON.parse(JSON.stringify(res.data[i]))
        }
      })
      .catch(function (error) {
        console.error(error)
      })
    axios.get(`http://localhost:7698/getIng`)
      .then(function (res) {
        for(i = 0; i < res.data.length;i++){
          arrayI[i] = JSON.parse(JSON.stringify(res.data[i]))
        }
      })
      .catch(function (error) {
        console.error(error)
      })
    let div    = document.createElement("div")
    let img    = document.createElement("img")
    let nome   = document.createElement("p")
    let button = document.querySelector("#button")
}