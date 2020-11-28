const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');

router.post('/addproduct', ownerController.addProduct);
router.post('/unblockseller', ownerController.unblockSeller);
router.post('/transferOwnership',ownerController.transferOwnership)

module.exports = router;
