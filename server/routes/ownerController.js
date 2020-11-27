const manager = require('../manager');
const ownerManager = manager.sellerManager;

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const ownerController = {
  login: async function (req, res, next) {
    try {
      if (!req.body || !req.body.email || !req.body.password) {
        throw new Error('Invalid email or password');
      }

      const email = req.body.email;
      const password = req.body.password;

      const rawResponse = await ownerManager.getPasswordByEmail(email);
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

      await ownerManager.checkEmailRegistered(email);

      const hash = await argon2.hash(password);
      const privateKey = await ownerManager.generatePrivateKey();

      await ownerManager.storeOwner(email, hash, privateKey);

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

  addProduct: async function (req, res, next) {
    try {
      // object containing details of product to be added...
      const productDetails = req.body.productDetails;
      // web3 function call....

      res.send('Product added successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = ownerController;
