const manager = require('../manager');
const commonManager = manager.commonManager;
const sellerOp = require('../chainop/sellerOp');

const sellerController = {
  sellProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('No body');
      }
      const { productId, buyerAddress, email } = req.body;

      if (!productId || !buyerAddress || !email) {
        throw new Error('Not All Details');
      }
      const privateKey = await commonManager.getPrivateKeyByEmail(email);

      await sellerOp.sell(productId, buyerAddress, privateKey);
      res.send('Sold successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = sellerController;
