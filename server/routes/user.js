const express = require('express');
const router = express.Router();
const userController = require('./userController');
const commonController = require('./commonController');

router.post('/reportseller', userController.reportSeller);
router.post('/buyproduct', userController.buyAndVerifyProduct);
router.post('/productdetails', commonController.getProductDetails);
router.post('/productseller', commonController.getSellerOfProduct);

module.exports = router;
