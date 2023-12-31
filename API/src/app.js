const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()

const route = require('./routes/route')

app.use(express.urlencoded({extended:true})) 
app.use(express.json())


//https://www.youtube.com/watch?v=R831QHI0AAE
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Methods",'POST,GET,DELETE');
 // //https://stackoverflow.com/questions/25727306/request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr
    res.header("Access-Control-Allow-Headers",'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});

app.use(express.static(__dirname + '/public'))

app.use("/",route)

app.set('view engine', 'ejs')

app.get("/rf",(req,res) => {
    res.sendFile("C:/Users/u23143/Documents/GitHub/Projeto-de-Pratica-II/interfaces")
})
app.listen(7698,() => { 
    console.log("Cotuca's pizzaria server started.")
    
})