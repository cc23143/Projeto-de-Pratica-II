const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getRaiz = ("/",(req,res) => {
    res.send("<h1>Cotuca's Pizzaria</h1>");
})

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
        console.log(client)
        console.log(func)
        let ObjClient = JSON.parse(client) 
        let ObjFunc   = JSON.parse(func)
        console.log(ObjClient)
        console.log(ObjFunc.count)
        if(ObjClient.count = 1){
            output = (await prisma.$queryRaw`select nome from Pizzaria.Cliente where email = ${emailReq} and senha = ${senhaReq}`)
        }else if(ObjFunc.count = 1){
            output = (await prisma.$queryRaw`select func from Pizzaria.Funcionario where email = ${emailReq} and senha = ${senhaReq}`)
        }else{
            output = ("nothing")
        }
    }catch(error){
        output = "nothing"
    }finally{
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
    let dataNasc    = dataNascAno + "-" + dataNascDia + "-" + dataNascMes
    try{
        let Verif = await prisma.$queryRaw`select count(*) from Pizzaria.Cliente where email = ${email}`
        if(Verif = 0){
            await prisma.$executeRaw`insert into Pizzaria.Cliente values(${nome},${sobrenome},${email},${senha},${endereco},convert(datetime,${dataNasc}),${sexo})`
            console.log(`login de ${nome} ${sobrenome} feito com sucesso!`)
            res.send(`login de ${nome} ${sobrenome} feito com sucesso!`)
        }
    }catch(err){
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
        console.log(VerifClient)
        console.log(VerifFunc)
        if((VerifClient+VerifFunc) != 0){
            if(VerifFunc > 0){
                await prisma.$executeRaw`update Pizzaria.Cliente set senha = ${senhaNova} where email = ${email} and senha = ${senhaAntiga}`
                res.send(`senha alterada com sucesso!`)
            }else if(VerifClient > 0){
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

