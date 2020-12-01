const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');
const commonController = require('./commonController');

router.post('/addproduct', ownerController.addProduct);
router.post('/unblockseller', ownerController.unblockSeller);
router.post('/transferOwnership', ownerController.transferOwnership);
router.post('/getproducts', commonController.getAllProducts);

module.exports = router;
