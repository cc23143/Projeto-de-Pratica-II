const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const controller = require('../controllers/controller') 
const { Router } = require('express')

router.get('/',controller.getRaiz);
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