const express = require('express');
const router = express.Router();
const userController = require('./userController');

// router.post('/signup', userController.signup);
// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
router.get('/reportseller', userController.reportSeller);
router.get('/getproducts', userController.getAllProducts);
router.get('/buyproduct', userController.buyAndVerifyProduct);
router.get('/unblockseller', userController.unblockSeller);

module.exports = router;
