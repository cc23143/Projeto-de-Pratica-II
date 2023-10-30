const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()

const route = require('./routes/route')

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

app.use("/",route)

app.listen(7698,() => { 
    console.log("Cotuca's pizzaria server started.")
})