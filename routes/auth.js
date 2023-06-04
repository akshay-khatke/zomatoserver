const express = require('express');
const router = express.Router();
const {LoginUser,Register}=require('../controller/authController')

router.post('/login',LoginUser)
router.post('/register',Register)

module.exports = router;