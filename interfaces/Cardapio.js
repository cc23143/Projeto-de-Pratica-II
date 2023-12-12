
    let arrayP = []
    let arrayI = []
    console.log(2)
    axios.get(`http://localhost:7698/getCardapioP`)
      .then(function (res) {
        for(i=0;i<res.data.length;i++){
            var newItem = document.createElement('div');
            newItem.className = 'item';
            console.log(2)

            var titleSpan = document.createElement('span');
            titleSpan.className = 'titulo-item';
            titleSpan.textContent = '' + res.data[i].nomePizza

            newItem.appendChild(titleSpan);
            var imgElement = document.createElement('img');
            imgElement.className = 'img-item';
            imgElement.src = 'img/' + res.data[i].img;
            imgElement.alt = '';
            newItem.appendChild(imgElement);

            var priceSpan = document.createElement('span');
            priceSpan.className = 'preço-item';
            priceSpan.textContent = "R$" + res.data[i].precoPizza
            newItem.appendChild(priceSpan);


            var addButton = document.createElement('button');
            addButton.className = 'botao-item';
            addButton.textContent = 'Adicionar ao carrinho';
            newItem.appendChild(addButton);


            document.querySelector('.container-items').appendChild(newItem);
            console.log('New item:', newItem);
            console.log('Container:', document.querySelector('.container-items'));
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
      
function addToCarrinho(){
    axios.post(`http://localhost:7698/addC`, {params:{
        idCliente:
    }})
}

var mostraCarrinho = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    var EliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<EliminarItem.length; i++){
        var button = EliminarItem[i];
        button.addEventListener('click',eliminarItemcarrinho);
    }

    var somarQuantidade = document.getElementsByClassName('somar-quantidade');
    for(var i=0;i<somarQuantidade.length; i++){
        var button = somarQuantidade[i];
        button.addEventListener('click',somarQuantidadeDeProdutos);
    }

    var subtrairValor = document.getElementsByClassName('quantidade');
    for(var i=0;i<subtrairValor.length; i++){
        var button = subtrairValor[i];
        button.addEventListener('click',subtrairQuantidadeDeProdutos);
    }

    var buttonsContainer = document.querySelector('.container-items');

    buttonsContainer.addEventListener('click', function (event) {
    var target = event.target;

    // Check if the clicked element has the class 'botao-item'
    if (target.classList.contains('botao-item')) {
        var item = target.parentElement;
        var titulo = item.querySelector('.titulo-item').innerText;
        var preço = item.querySelector('.preço-item').innerText;
        var imagenSrc = item.querySelector('.img-item').src;

        adicionarAoCarrinho(titulo, preço, imagenSrc);
        mostrarCarrrinho();
    }
});

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

function pagarClicked(){
    alert("Obrigado por comprar conosco");
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    while (carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild)
    }
    atualizarTotalcarrinho();
    ocultarcarrinho();
}
function btnAdicionarAoCarrinho(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preço = item.getElementsByClassName('preço-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    adicionarAoCarrinho(titulo, preço, imagenSrc);

    mostrarCarrrinho();
}

function mostrarCarrrinho(){
    carrinhoVisible = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

function adicionarAoCarrinho(titulo, preço, imagenSrc){
    var item = document.createElement('div');
    item.classList.add('item');
    var itemscarrinho = document.getElementsByClassName('carrinho-items')[0];

    var nomesItensNoCarrinho = itemscarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0;i < nomesItensNoCarrinho.length;i++){
        if(nomesItensNoCarrinho[i].innerText==titulo){
            alert("O item ja esta no carrinho");
            return;
        }
    }

    var itensNoCarrinho = `
        <div class="carrinho-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrinho-item-detalles">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="seletor-quantidade">
                    <i class="fa-solid fa-minus quantidade"></i>
                    <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                    <i class="fa-solid fa-plus somar-quantidade"></i>
                </div>
                <span class="carrinho-item-preço">${preço}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itensNoCarrinho;
    itemscarrinho.append(item);

     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemcarrinho);

    var botaoSubtrair = item.getElementsByClassName('quantidade')[0];
    botaoSubtrair.addEventListener('click',subtrairQuantidadeDeProdutos);

    var botaoSomar = item.getElementsByClassName('somar-quantidade')[0];
    botaoSomar.addEventListener('click',somarQuantidadeDeProdutos);

    atualizarTotalcarrinho();
}
function somarQuantidadeDeProdutos(event){
    var buttonClicked = event.target;
    var seletor = buttonClicked.parentElement;
    console.log(seletor.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeActual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeActual++;
    seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeActual;
    atualizarTotalcarrinho();
}
function subtrairQuantidadeDeProdutos(event){
    var buttonClicked = event.target;
    var seletor = buttonClicked.parentElement;
    console.log(seletor.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeActual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeActual--;
    if(quantidadeActual>=1){
        seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeActual;
        atualizarTotalcarrinho();
    }
}

function eliminarItemcarrinho(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    atualizarTotalcarrinho();

    ocultarcarrinho();
}
function ocultarcarrinho(){
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carrinhoItems.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carrinhoVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}

function atualizarTotalcarrinho() {
    var carrinhocontainer = document.getElementsByClassName('carrinho')[0];
    var carrinhoItems = carrinhocontainer.getElementsByClassName('carrinho-item');
    var total = 0;

    for (var i = 0; i < carrinhoItems.length; i++) {
        var item = carrinhoItems[i];
        var preçoElemento = item.getElementsByClassName('carrinho-item-preço')[0];
        var preçoText = preçoElemento.innerText;
        var preçoLimpo = preçoText.replace(/[^\d.,]/g, '');
        preçoLimpo = preçoLimpo.replace(',', '.');
        var preço = parseFloat(preçoLimpo);

        if (!isNaN(preço)) {
            var quantidadeItem = item.getElementsByClassName('carrinho-item-quantidade')[0];
            var quantidade = parseInt(quantidadeItem.value, 10);

            total += preço * quantidade;
        }
    }

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrinho-preço-total')[0].innerText = 'R$ ' + total.toLocaleString("pt-BR");
}