const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');

router.post('/signup', ownerController.signup);
router.post('/login', ownerController.login);
router.post('/logout', ownerController.logout);
router.post('/addproduct', ownerController.addProduct);
router.post('/unblockseller', ownerController.unblockSeller);

module.exports = router;
