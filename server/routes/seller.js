const express = require('express');
const router = express.Router();
const sellerController = require('./sellerController');

router.post('/signup', sellerController.signup);
router.post('/login', sellerController.login);
router.post('/logout', sellerController.logout);
router.post('/sellproduct', sellerController.sellProduct);

module.exports = router;
