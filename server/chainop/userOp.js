const common = require('./common');

const userOp = {
  async buyProduct(secretId, privateKey) {
    try {
      const signedTransaction = await common.signTransaction(
        `buyProduct(${secretId})`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to purchase product');
    }
  },
  async reportSeller(productId, privateKey) {
    try {
      const signedTransaction = await common.signTransaction(
        `registerReport(${productId})`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to report seller');
    }
  },
  
  async getAllProducts(ownerAddress) {
    try {
      const result = await common.callTransaction(
        `getAllProducts(${ownerAddress})`,
      );
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to retrieve all products');
    }
  }
};

module.exports = userOp;
