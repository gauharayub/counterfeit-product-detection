const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/reportseller', userController.reportSeller);
router.post('/buyproduct', userController.buyAndVerifyProduct);
router.post('/productdetails', userController.getProductDetails);
router.post('/productseller', userController.getSellerOfProduct);

module.exports = router;
