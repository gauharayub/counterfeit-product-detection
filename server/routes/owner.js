const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');
const commonController = require('./commonController');

router.post('/addproduct', ownerController.addProduct);
router.post('/unblockseller', ownerController.unblockSeller);
router.post('/transferOwnership', ownerController.transferOwnership);
router.post('/getproducts', commonController.getAllProducts);
router.post('/addowner', ownerController.addOwner);
router.post('/productdetails', commonController.getProductDetails);
router.post('/productseller', commonController.getSellerOfProduct);

module.exports = router;
