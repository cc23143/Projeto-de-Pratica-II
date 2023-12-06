const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const controller = require('../controllers/controller') 

router.get('/',controller.getRaiz);
router.post('/addCadastro',controller.addCadastro)
router.get('/verifCadastro',controller.verifCadastro)
router.put('/altSenha',controller.altSenha)
router.get('/getCardapioP',controller.getCardapioPizza)
router.get('/getCardapioB',controller.getCardapioBebida)
router.post('/addCardapioP',controller.addPizzaToCardapio)
router.get('/getIng',controller.getIng)

module.exports = router