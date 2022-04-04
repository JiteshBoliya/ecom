const express = require('express')
const User = require('../model/user')
const auth= require('../middleware/auth')
const router=new express.Router()
const userctr=require('../controllers/user')

//Register user 
router.post('/user',userctr.register_user)

//Login user
router.post('/userlogin',userctr.login_user)

//Get loged in user details
router.get('/user/info',auth,userctr.get_user )
module.exports =router