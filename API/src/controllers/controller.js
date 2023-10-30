const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.verifCadastro = ("/verifCadastro",async(req,res) => {
    let emailReq = req.query.email
    let senhaReq = req.query.senha
    try{
        let res = await prisma.PrismaClient.getFist({
            where:{
                email : emailReq,
                senha : senhaReq
            }
        })
    }catch(error){
        let res = "Indo-ali"
    }finally{
        res.json(res)
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
    let result = "Nothing"
    try{
        result = await prisma.$executeRaw`insert into Pizzaria.Cliente values(${nome},${sobrenome},${email},${senha},${endereco},convert(datetime,${dataNasc}),${sexo})`
        console.log(`login de ${nome} ${sobrenome} feito com sucesso!`)
        res.send("login feito com sucesso!")
    }catch(error){
        res.send(error)
    }
}) 