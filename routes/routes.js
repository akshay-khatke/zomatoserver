const authRouter=require('./auth')
const productRouter=require('./products');

const express = require('express');

const router=express.Router();
console.log("routes")
router.use('/auth',authRouter)
router.use('/storeProduct',productRouter)

module.exports= router;