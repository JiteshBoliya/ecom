const express = require('express')
const Product = require('../model/product')
const auth = require('../middleware/auth')
const { stringify } = require('nodemon/lib/utils')
const router = new express.Router()
const productctr=require('../controllers/product')

//Add Product
router.post('/product', auth,productctr.add_product)

//Get Product
router.get('/product', auth, productctr.get_product)

//Update Product
router.patch('/product/:id', auth,productctr.update_product)

//Delete product
router.delete('/product/:id', auth,productctr.delete_product)

//Add comments
router.patch('/product/comment/:id', auth,productctr.add_comments)

//Like product
//router.patch('/product/like/:id', auth,productctr.like_on_post_number)
router.patch('/product/like/:id', auth,productctr.like_on_product)

//Show products by types
router.get('/productbytype', auth,productctr.show_product_by_type)

//Show most liked product
// router.get('/mostlikedproduct', auth,productctr.show_mostlike_post)

router.get('/mostlikedproduct', auth,productctr.show_mostlike_product)

//Show Recent product
router.get('/recentproduct', auth,productctr.show_receant)

module.exports = router