const express = require('express')
const Type= require('../model/type')
const auth = require('../middleware/auth')
const router=new express.Router()
const typectr=require('../controllers/type')

//Add Type
router.post('/type',auth,typectr.set_type)

//Get Type
router.get('/type',auth,typectr.get_type)
module.exports =router