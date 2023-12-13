const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express')
const app = express()

const route = require('./routes/route')

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html"
  });

  const html = fs.readFileSync(__dirname + "/bai55.html", "utf8");
  const user = "Node JS";

  html = html.replace("{ user }", user);
  res.end(html);
}).listen(1337);


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