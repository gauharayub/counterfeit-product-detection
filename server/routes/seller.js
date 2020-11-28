const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');
const commonController = require('./commonController');

router.post('/signup', commonController.signup);
router.post('/login', commonController.login);
router.get('/logout', commonController.logout);
router.post('/sellproduct', sellerController.sellProduct);

module.exports = router;
