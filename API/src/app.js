const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const http   = require('http')
const fs     = require('fs')
const express = require('express')
const app = express()

const route = require('./routes/route')

fs.readFile("C:/Users/u23143/Documents/GitHub/Projeto-de-Pratica-II/interfaces", function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(3000);
});

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

app.use("/",route)

app.listen(7698,() => { 
    console.log("Cotuca's pizzaria server started.")
})