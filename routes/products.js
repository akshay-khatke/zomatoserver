const express = require('express');
const router = express.Router();
const { GetStoreProducts, CreateProduct, GetProductById } = require('../controller/storeProductController')


console.log(GetStoreProducts,GetProductById,"data")

router.get('/getProducts', GetStoreProducts)
router.post('/createProduct', CreateProduct)
router.get('/getProductById/:id', GetProductById)

module.exports = router;