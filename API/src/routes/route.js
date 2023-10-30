const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const controller = require('../controllers/controller') 

router.get('/',controller.getRaiz);
router.post('/addCadastro',controller.addCadastro)
router.get('/verifCadastro',controller.verifCadastro)

module.exports = router