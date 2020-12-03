const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');
const commonController = require('./commonController');

router.post('/signup', commonController.signup);
router.post('/login', commonController.login);
router.get('/logout', commonController.logout);
router.post('/sellproduct', sellerController.sellProduct);
router.post('/getproducts', commonController.getAllProducts);
router.post('/productdetails', commonController.getProductDetails);
router.post('/productseller', commonController.getSellerOfProduct);

module.exports = router;
