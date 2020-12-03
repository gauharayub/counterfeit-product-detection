const userOp = require('../chainop/userOp');

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

      // private key required
      await userOp.reportSeller(productId, privateKey);
      res.send('Seller reported successfully');
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

      // private key required
      await userOp.buyProduct(secretId, privateKey);
      res.status(200).send('Purchase and product verification successfull');
    } catch (error) {
      res.status(400).send(error);
      return next(error);
    }
  },

  getProductDetails: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      // secretId of the product extracted from qr code...
      const { productId } = req.body;

      if (!productId) {
        throw new Error('Details incomplete');
      }

      const productDetails = await userOp.getProductDetails(productId);
      res.send({ productDetails: productDetails });
    } catch (error) {
      return next(error);
    }
  },

  getSellerOfProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      // secretId of the product extracted from qr code...
      const { productId } = req.body;

      if (!productId) {
        throw new Error('Details incomplete');
      }
      const productSeller = await userOp.getSellerOfProduct(productId);
      res.send({ seller: productSeller });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
