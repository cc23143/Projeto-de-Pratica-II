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
    res.header("Access-Control-Allow-Methods",'GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers",'');
    next();
});

app.use("/",route)

app.listen(7698,() => { 
    console.log("Cotuca's pizzaria server started.")
})