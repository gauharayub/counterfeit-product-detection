const manager = require('../manager');
const userManager = manager.userManager;
const userOp = require('../chainop/userOp');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userController = {
  // login: async function (req, res, next) {
  //   try {
  //     if (!req.body || !req.body.email || !req.body.password) {
  //       throw new Error('Invalid email or password');
  //     }

  //     const email = req.body.email;
  //     const password = req.body.password;

  //     const rawResponse = await userManager.getPasswordByEmail(email);
  //     const response = rawResponse[0];

  //     if (await argon2.verify(response, password)) {
  //       res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));

  //       return res.send('Login successfully');
  //     } else {
  //       throw new Error('Password does not match');
  //     }
  //   } catch (error) {
  //     return next(error);
  //   }
  // },

  // signup: async function (req, res, next) {
  //   try {
  //     if (!req.body || !req.body.email || !req.body.password) {
  //       throw new Error('Invalid email or password');
  //     }

  //     const email = req.body.email;
  //     const password = req.body.password;

  //     await userManager.checkEmailRegistered(email);

  //     const hash = await argon2.hash(password);
  //     const privateKey = await userManager.generatePrivateKey();

  //     await userManager.storeUser(email, hash, privateKey);

  //     res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));
  //     res.send('Seller registered successfully');
  //   } catch (error) {
  //     return next(error);
  //   }
  // },

  // logout: function (req, res, next) {
  //   res.clearCookie('jwt');
  //   res.redirect('/');
  // },

  reportSeller: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { productId, email } = req.body;

      if (!email || !productId) {
        throw new Error('Details incomplete');
      }

      const privateKey = userManager.getPrivateKeyByEmail(email);
      await userOp.reportSeller(productId, privateKey);
      res.send('Seller reported successfully');
    } catch (error) {
      return next(error);
    }
  },

  unblockSeller: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { sellerAddress, email } = req.body;

      if (!email || !sellerAddress) {
        throw new Error('Details incomplete');
      }
      const privateKey = userManager.getPrivateKeyByEmail(email);
      await userOp.unblockSeller(sellerAddress, privateKey);
      res.send('Seller unblocked successfully');
    } catch (error) {
      return next(error);
    }
  },

  getAllProducts: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }
      const { ownerAddress, email } = req.body;

      if (!email || !ownerAddress) {
        throw new Error('Details incomplete');
      }

      const privateKey = userManager.getPrivateKeyByEmail(email);
      const products = await userOp.getAllProducts(ownerAddress, privateKey);
      res.send(products);
    } catch (error) {
      return next(error);
    }
  },

  buyAndVerifyProduct: async function (req, res, next) {
    // call this method after scanning the product...
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      // secretId of the product extracted from qr code...
      const { secretId, email } = req.body;

      if (!email || !secretId) {
        throw new Error('Details incomplete');
      }

      await userOp.buyProduct(secretId);
      res.send('Purchase and product verification successfull');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
