const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const controller = require('../controllers/controller') 
const { Router } = require('express')
const express = require('express')
const router = express.Router()
const path   = require("path")

router.get('/cad', function(req, res){
    res.render("" + path.join(__dirname, "../controllers/views/index.ejs"));
 });
router.get("/NewCad", function(req, res){
    res.render("" + path.join(__dirname, "..", 'controllers', 'views', 'index2.ejs'));
});
router.get("/Client", function(req, res){
    res.render("" + path.join(__dirname, "..", 'controllers', 'views', 'InterCliente.ejs'));
});
router.get("/Cardapio", function(req, res){
    res.render("" + path.join(__dirname, "..", 'controllers', 'views', 'Cardapio.ejs'));
});
router.get("/logoctcpng",function(req,res){
    res.render("" + path.join(__dirname, "..", 'public', 'img', 'logoctc.png'))
})
router.post('/addCadastro',controller.addCadastro)
router.get('/verifCadastro',controller.verifCadastro)
router.put('/altSenha',controller.altSenha)
router.get('/getCardapioP',controller.getCardapioPizza)
router.get('/getPFD', controller.getPFromData)
router.get('/getCardapioB',controller.getCardapioBebida)
router.post('/addCardapioP',controller.addPizzaToCardapio)
router.get('/getIng',controller.getIng)
router.post('/addC',controller.addToCarrinho)
router.post('/ped', controller.Pedido)
router.get('/getLNProd', controller.getLastNumProd)
router.get('/getC', controller.getCarrinho)
router.delete('/delC', controller.delCarrinho)


module.exports = router