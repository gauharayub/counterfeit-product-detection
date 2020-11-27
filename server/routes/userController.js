const manager = require('../manager');
const userManager = manager.userManager;

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userController = {
  login: async function (req, res, next) {
    try {
      if (!req.body || !req.body.email || !req.body.password) {
        throw new Error('Invalid email or password');
      }

      const email = req.body.email;
      const password = req.body.password;

      const rawResponse = await userManager.getPasswordByEmail(email);
      const response = rawResponse[0];

      if (await argon2.verify(response, password)) {
        res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));

        return res.send('Login successfully');
      } else {
        throw new Error('Password does not match');
      }
    } catch (error) {
      return next(error);
    }
  },

  signup: async function (req, res, next) {
    try {
      if (!req.body || !req.body.email || !req.body.password) {
        throw new Error('Invalid email or password');
      }

      const email = req.body.email;
      const password = req.body.password;

      await userManager.checkEmailRegistered(email);

      const hash = await argon2.hash(password);
      const privateKey = await userManager.generatePrivateKey();

      await userManager.storeUser(email, hash, privateKey);

      res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));
      res.send('Seller registered successfully');
    } catch (error) {
      return next(error);
    }
  },

  logout: function (req, res, next) {
    res.clearCookie('jwt');
    res.redirect('/');
  },

  reportSeller: async function (req, res, next) {
    try {
      // product ID of the counterfieted product..
      const productId = req.body.productId;
      // web3 function call..
      res.send('Seller reported successfully');
    } catch (error) {
      return next(error);
    }
  },

  unblockSeller: async function (req, res, next) {
    try {
      const sellerAddress = req.body.sellerAddress;
      // web3 function call...
    } catch (error) {
      return next(error);
    }
  },

  getAllProducts: async function (req, res, next) {
    try {
      const products = [];
      // web3 function call...
      res.send(products);
    } catch (error) {
      return next(error);
    }
  },

  buyAndVerifyProduct: async function (req, res, next) {
    // call this method after scanning the product...
    try {
      // secretId of the product extracted from qr code...
      const secretId = req.body.secretId;
      // web3 function call..
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
