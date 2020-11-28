const manager = require('../manager');
const userManager = manager.userManager;
const userOp = require('../chainop/userOp');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userController = {
  
  reportSeller: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { productId } = req.body;

      if (!productId) {
        throw new Error('Details incomplete');
      }

      const privateKey = userManager.generatePrivateKey();
      await userOp.reportSeller(productId, privateKey);
      res.send('Seller reported successfully');
    } catch (error) {
      return next(error);
    }
  },

  getAllProducts: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }
      const { ownerAddress } = req.body;

      if (!ownerAddress) {
        throw new Error('Details incomplete');
      }

      const privateKey = userManager.generatePrivateKey();
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
      const { secretId } = req.body;

      if (!secretId) {
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
