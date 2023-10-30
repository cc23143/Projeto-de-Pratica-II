const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getRaiz = ("/",(req,res) => {
    res.send("<h1>Cotuca's Pizzaria</h1>");
})

exports.verifCadastro = ("/verifCadastro",async(req,res) => {
    let emailReq = req.query.email
    let senhaReq = req.query.senha
    try{
        let resp = await prisma.$executeRaw`exec Pizzaria.VerifEmailESenha ${emailReq} ${senhaReq}`
    }catch(error){
        let resp = "Indo-ali"
    }finally{
        res.json(resp)
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