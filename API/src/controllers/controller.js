const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getRaiz = ("/",(req,res) => {
    res.send("<h1>Cotuca's Pizzaria</h1>");
})

exports.verifCadastro = ("/verifCadastro",async(req,res) => {
    let emailReq = req.query.email
    let senhaReq = req.query.senha
    let output   = '' 
    try{
        console.log(emailReq)
        console.log(senhaReq)
        let resp = await prisma.$executeRaw`
        declare @function varchar(30)
        exec Pizzaria.VerifEmailESenha ${emailReq} ${senhaReq} @function output`
        console.log(output)
        res.send(resp + "/-/" + output)
    }catch(error){
        let resp = "Nothing"
        res.send(resp + "/-/" + output + '/-/' + error)
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
        await prisma.$executeRaw`insert into Pizzaria.Cliente values(${nome},${sobrenome},${email},${senha},${endereco},convert(datetime,${dataNasc}),${sexo})`
        console.log(`login de ${nome} ${sobrenome} feito com sucesso!`)
        res.send(`login de ${nome} ${sobrenome} feito com sucesso!`)
    }catch(err){

    } 
}) 

