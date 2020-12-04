const manager = require('../manager');
const commonManager = manager.commonManager;
const sellerOp = require('../chainop/sellerOp');

const sellerController = {
  sellProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('No body');
      }
      const { productId, address, type } = req.body;

      const email = req.email;

      if (!productId || !address || !email) {
        throw new Error('Not All Details');
      }
      const privateKey = await commonManager.getPrivateKeyByEmail(email, type);

      await sellerOp.sell(productId, address, privateKey);
      res.send('Sold successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = sellerController;
