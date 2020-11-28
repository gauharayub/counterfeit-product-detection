const manager = require('../manager');
const commonManager = manager.commonManager;
const ownerOp = require('../chainop/ownerOp');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const ownerController = {

  addProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { productDetails, email } = req.body;

      if (!email || !productDetails) {
        throw new Error('Details incomplete');
      }

      const privateKey = commonManager.getPrivateKeyByEmail(email,'owner');
      await ownerOp.addProduct(productDetails, privateKey);
      res.send('Product added successfully');
    } catch (error) {
      return next(error);
    }
  },
  unblockSeller: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { sellerAddress } = req.body;
      const { email } = req

      if (!sellerAddress || !email) {
        throw new Error('Details incomplete');
      }

      const privateKey = commonManager.getPrivateKeyByEmail(email,'owner');
      await ownerOp.unblockSeller(sellerAddress, privateKey);
      res.send('Seller unblocked successfully');
    } catch (error) {
      return next(error);
    }
  },
  async transferOwnership(req,res,next) {
    try {
      return res.send("FUNCTION not ready yet")
     }
    catch(error) {
      console.log(error.message)
      return res.status(500).send("Failed to transfer ownership")
    }
  }
};

module.exports = ownerController;
