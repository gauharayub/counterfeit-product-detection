const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.get('/reportseller', userController.reportSeller);
router.get('/buyproduct', userController.buyAndVerifyProduct);
router.get('/productdetails', userController.getProductDetails);
router.get('/productseller', userController.getSellerOfProduct);

module.exports = router;
