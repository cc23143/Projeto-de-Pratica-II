const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
let http = require('http')
let fs = require("fs")

exports.verifCadastro = ("/verifCadastro",async(req,res) => {
    let emailReq = req.query.email
    let senhaReq = req.query.senha
    let output   = '' 
    let client
    let func
    try{
        client        = await prisma.$queryRaw`select count(*) from Pizzaria.Cliente where email = ${emailReq} and senha = ${senhaReq}`
        func          = await prisma.$queryRaw`select count(*) from Pizzaria.Funcionario where email = ${emailReq} and senha = ${senhaReq}`
        client        = JSON.stringify(client)
        func          = JSON.stringify(func)
        client        = client.slice(0, 3) + "count" + client.slice(3)
        func          = func.slice(0, 3) + "count" + func.slice(3)
        let ObjClient = JSON.parse(client) 
        let ObjFunc   = JSON.parse(func)
        if(ObjClient[0].count == 1){
            output = (await prisma.$queryRaw`select idCliente,nome from Pizzaria.Cliente where email = ${emailReq} and senha = ${senhaReq}`)
        }else if(ObjFunc[0].count == 1){
            output = (await prisma.$queryRaw`select idFunc,func from Pizzaria.Funcionario where email = ${emailReq} and senha = ${senhaReq}`)
        }else{
            output = ("nothing")
        }
    }catch(error){
        output = "nothing"
    }finally{
        console.log(output)
        res.json(output)
    }
}) 

exports.addCadastro = ("/addCadastro",async(req,res) => {
    let email       = req.query.email
    let senha       = req.query.senha
    let nome        = req.query.nome
    let sobrenome   = req.query.sobrenome
    let sexo        = req.query.sexo
    let dataNascDia = req.query.dataNascDia
    let dataNascMes = req.query.dataNascMes
    let dataNascAno = req.query.dataNascAno
    let endereco    = req.query.endereco
    console.log(`${nome} - ${email} - ${dataNascDia} - ${dataNascMes} - ${dataNascAno}`)
    let dataNasc    = dataNascAno + "-" + dataNascDia + "-" + dataNascMes
    let Verif   = await prisma.$queryRaw`select count(*) from Pizzaria.Cliente where email = ${email}`
    console.log(Verif)
    Verif       = JSON.stringify(Verif)
    Verif       = Verif.slice(0, 3) + "count" + Verif.slice(3)
    let ObjVerif= JSON.parse(Verif) 
    console.log(Verif)
    try{
        console.log('checkpoint')
        if(ObjVerif[0].count == 0){
            console.log(dataNasc)
            await prisma.$queryRaw`insert into Pizzaria.Cliente values(${nome},${sobrenome},${email},${senha},${endereco},convert(datetime,${dataNasc}),${sexo})`
            res.send(`login de ${nome} ${sobrenome} feito com sucesso!` )
        }else{
            res.send(`Este email já está cadastrado.`)
        }
    }catch(err){ 
        console.log(err)
        res.send(`houve um erro ao executar login. Por favor, tente novamente.`)
    } 
})

exports.altSenha = ("/altSenha",async(req,res) => {
    let email        = req.query.email
    let senhaAntiga  = req.query.senhaAntiga
    let senhaNova    = req.query.senhaNova
    try{
        let VerifClient = await prisma.$queryRaw`select count(*) from Pizzaria.Cliente where email = ${email} and senha = ${senhaAntiga}`
        let VerifFunc   = await prisma.$queryRaw`select count(*) from Pizzaria.Funcionario where email = ${email} and senha = ${senhaAntiga}`
        client        = JSON.stringify(VerifClient)
        func          = JSON.stringify(VerifFunc)
        client        = client.slice(0, 3) + "count" + client.slice(3)
        func          = func.slice(0, 3) + "count" + func.slice(3)
        console.log(client)
        console.log(func)
        let ObjClient = JSON.parse(client) 
        let ObjFunc   = JSON.parse(func)
        if((ObjClient[0].count+ObjFunc[0].count) != 0){
            if(ObjClient[0].count > 0){
                await prisma.$executeRaw`update Pizzaria.Cliente set senha = ${senhaNova} where email = ${email} and senha = ${senhaAntiga}`
                res.send(`senha alterada com sucesso!`)
            }else if(ObjFunc[0].count > 0){
                await prisma.$executeRaw`update Pizzaria.Funcionario set senha = ${senhaNova} where email = ${email} and senha = ${senhaAntiga}`
                res.send(`senha alterada com sucesso!`)
            }else{
                res.send(`senha não alterada. Tente novamente!`)
            }
        }
    }catch(err){
        res.send(`houve um erro ao alterar a senha. Por favor, tente novamente.`)
    } 
}) 

exports.getCardapioPizza = ("/getCardapioP",async(req,res) => {
    let CardPizza  = await prisma.$queryRaw`select * from Pizzaria.V_Pizza order by NumCard`
    res.json(CardPizza)
})

exports.getPFromData = ('/getPFD',async(req,res) => {
    let nome    = req.query.nome
    let preco   = req.query.preco
    let img     = req.query.img
    console.log(nome )    
    console.log(preco)
    console.log(img  )    
    let Pizza   = await prisma.$queryRaw`select idPizza from Pizzaria.Pizza where precoPizza = cast(${preco} as money) and img = ${img} and nomePizza = ${nome}`
    res.json(Pizza)
})

exports.getIng = ("/getIng",async(req,res) => {
    let Ing       = await prisma.$queryRaw`select * from Pizzaria.ingrediente order by idPizza`
    res.json(Ing)
})

exports.getCardapioBebida = ("/getCardapioB",async(req,res) => {
    let CardBebida  = await prisma.$queryRaw`select * from Pizzaria.Bebida order by NumCard`
    res.json(CardBebida)
})

exports.addPizzaToCardapio = ("/addCardapioP",async(req,res) => {
    let nome    = req.query.nome
    let preco   = req.query.preco
    let NumCard = req.query.NumCard
    let img     = req.query.img
    if(preco > 0){
        let Pizza   = await prisma.$queryRaw`insert into Pizzaria.Pizza values(${nome},${preco},${NumCard},${img})`
    }
})

exports.addToCarrinho = ("/addC",async(req,res) => {
    let idCliente  = req.query.idCliente
    let NumProduto = req.query.NumProduto //array, tem que definir o tamanho dos outros e seguir na sequência: [1;2;3;4;5;6;[...];N]
    let idPizza    = req.query.idPizzas   //array, se não houver pizzas nesse produto, a posição contém 0
    let idBebida   = req.query.idBebidas  //mesmo caso das pizzas
    let NumPizzas  = req.query.NumPizzas  //array, aparece na posiição correspondente a pizza
    let NumBebidas = req.query.NumBebidas //mesmo caso
    let TamPizzas  = req.query.TamanhoP   //define o tamanhoda pizza conforme a posição
    //!!!O idCarrinho é sempre igual ao idCliente!!!\\
    let arrayRes   = []
    try{
        for(i = 0; i < NumProduto.length;i++){
            if(idPizza[i] == 0){
                let insertedCart = await prisma.$queryRaw`insert into Pizzaria.CarrinhoDeCompras values(${idCliente},${NumProduto[i]},null,${idBebida[i]},${idCliente},null,${NumBebidas[i]},null)`
            }else if(idBebida[i] == 0){
                let insertedCart = await prisma.$queryRaw`insert into Pizzaria.CarrinhoDeCompras values(${idCliente},${NumProduto[i]},${idPizza[i]},null,${idCliente},${NumPizzas[i]},null,${TamPizzas[i]})`
            }
            arrayRes[i] = insertedCart
        }
        res.json(arrayRes)

    }catch(err){
        console.log(err)
    }
    console.log(NumProduto + "/*/" + idCliente + "/*/" + idPizza + "/*/" + idBebida + "/*/" + NumPizzas + "/*/" + NumBebidas + "/*/" + TamPizzas)
    
})

exports.Pedido = ("/ped",async(req,res) => {
    let idFunc     = req.query.idF
    let idCarr     = req.query.idCarr
    let data       = new Date()
    let StringData = data.getDate() + "-" + data.getMonth() + "-" + data.getFullYear()
    let Carr       = await prisma.$queryRaw`select count(*) from Pizzaria.CarrinhoDeCompras where idCarrinho = ${idCarr}`
    Carr           = JSON.stringify(Carr)
    Carr           = Carr.slice(0, 3) + "count" + Carr.slice(3)
    let ObjCarr    = JSON.parse(Carr) 
    let Car2       = await prisma.$queryRaw`select sum(P.precoPizza) as SP, sum(B.precoBebida) SB, C.NumeroDePizzas, C.NumeroDeBebidas from Pizzaria.Pizza P,Pizzaria.Bebida B, Pizzaria.CarrinhoDeCompras C where idCarrinho = ${idCarr} and(P.idPizza = C.idPizza or C.idBebida = B.idBebida) group by C.NumeroDePizzas,C.NumeroDeBebidas`
    Car2           = JSON.stringify(Car2)
    let ObjCar2    = JSON.parse(Car2)
    let result     = await prisma.$queryRaw`insert into Pizzaria.pedido values (${idFunc},${idCarr},${ObjCarr[0].count},${ObjCar2[0].SP * ObjCar2[0].NumeroDePizzas + ObjCar2[0].SB * ObjCar2[0].NumeroDeBebidas},null,${StringData})`
    res.json(result)
})

exports.getLastNumProd = ("/getLNProd", async(req,res) => {
    let idC  = req.query.idCar
    let Num  = await prisma.$queryRaw`select count(NumProduto) + 1 from Pizzaria.CarrinhoDeCompras where idCarrinho=${idC}`
    Num         = JSON.stringify(Num)
    Num         = Num.slice(0, 3) + "count" + Num.slice(3)
    let ObjNum  = JSON.parse(Num)
    res.json(ObjNum)
})

exports.getCarrinho = ("/getC",async(req,res) => {
    let id  = req.query.id
    let Car = await prisma.$queryRaw`select * from Pizzaria.CarrinhoDeCompras where idCarrinho = ${id}`
    res.json(Car)
})

exports.delCarrinho = ('/delC',async(req,res) => {
    let id = req.query.id
    let Car = await prisma.$queryRaw`delete from Pizzaria.CarrinhoDeCompras where idCarrinho = ${id}`
    res.json(Car)
})

exports.Pedido   = ("/ped",async(req,res) => {
    let idFunc   = req.query.idF
    let idCarr   = req.query.idCarr
    let data     = new Date()
    let StrDate  = data.getDate() + "-" + data.getMonth() + "-" + data.getFullYear()
    let Carr     = await prisma.$queryRaw`select count(*) from Pizzaria.CarrinhoDeCompras where idCarrinho = ${idCarr}`
    Carr         = JSON.stringify(Carr)
    Carr         = Carr.slice(0, 3) + "count" + Carr.slice(3)
    let ObjCarr  = JSON.parse(Carr)
    let Preco    = await prisma.$queryRaw`select sum(P.precoPizza) as SP, sum(B.precoBebida) as SB, C.NumeroDePizzas, C.NumeroDeBebidas from Pizzaria.CarrinhoDeCompras C, PIzzaria.Pizza P, Pizzaria.Bebida B where idCarrinho = ${idCarr} and (P.idPizza = C.idPizza or B.idBebida = C.idBebida) group by C.NumeroDePizzas,C.NumeroDeBebidas`
    Preco        = JSON.stringify(Preco)
    let ObjPreco = JSON.parse(Preco)
    try{
        await prisma.$queryRaw`insert into Pizzaria.pedido values (${idFunc}, ${idCarr}, ${ObjCarr[0].count}, ${(ObjPreco[0].SP * ObjPreco[0].NumeroDePizzas) + (ObjPreco[0].SB * ObjPreco[0].NumeroDeBebidas)}, null, cast(${StrDate} as date))`
        res.send("pedido feito com sucesso!")
    }catch(e){
        console.log(e)
        res.send("ocorreu um erro na inserção do pedido.")
    }
})



//exports.

//exports.

/*
Isso vai ser feito via javadbc [o prisma n dá suporte para view]
exports.getMenu = ("/getMenu",async(req,res) => {
    let menuTipo = req.query.tipo  //tipo só pode ser Bebida ou Pizza(dropdown menu)
    let menu
    console.log(menuTipo)
    try{
        if(menuTipo = "Bebida"){
            menu = await prisma.$queryRaw`select * from Pizzaria.V_CardapioBebidas`
        }else if(menuTipo = "Pizza"){
            menu = await prisma.$queryRaw`select * from Pizzaria.V_CardapioPizza`
        }else{
            menu = "Não se trata de um cardápio válido!" 
        }
        menu = await prisma.$queryRaw`select * from Pizzaria.V_CardapioBebidas`
    }catch(err){
        menu = err + ""
    }finally{
        res.json(menu)
    }
})*/

