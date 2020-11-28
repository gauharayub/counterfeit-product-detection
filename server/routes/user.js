const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/reportseller', userController.reportSeller);
router.get('/getproducts', userController.getAllProducts);
router.get('/buyproduct', userController.buyAndVerifyProduct);

module.exports = router;
