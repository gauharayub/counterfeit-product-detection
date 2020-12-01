const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');
const commonController = require('./commonController');

router.post('/signup', commonController.signup);
router.post('/login', commonController.login);
router.get('/logout', commonController.logout);
router.post('/addproduct', ownerController.addProduct);
router.post('/unblockseller', ownerController.unblockSeller);
router.post('/transferOwnership', ownerController.transferOwnership);
router.post('/getproducts', commonController.getAllProducts);

module.exports = router;
