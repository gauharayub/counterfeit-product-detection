const express = require('express');
const router = express.Router();
const ownerController = require('./ownerController');

router.post('/signup', ownerController.signup);
router.post('/login', ownerController.login);
router.post('/logout', ownerController.logout);
router.get('/addproduct', ownerController.addProduct);

module.exports = router;
