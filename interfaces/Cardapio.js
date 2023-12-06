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

    var adicionarAoCarrinho = document.getElementsByClassName('botao-item');
    for(var i=0; i<adicionarAoCarrinho.length;i++){
        var button = adicionarAoCarrinho[i];
        button.addEventListener('click', btnAdicionarAoCarrinho);
    }

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
    item.classList.add = ('item');
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