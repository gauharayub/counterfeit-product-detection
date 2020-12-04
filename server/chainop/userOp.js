const common = require('./common');

const userOp = {
  async buyProduct(secretId, privateKey=process.env.COMMON_PRIVATE_KEY) {
    try {
      const signedTransaction = await common.signTransaction(
        `buyProduct('${secretId}')`,
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
        `registerReport('${productId}')`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      error.status = 202
      throw new Error(error);
    }
  },

  async getSellerOfProduct(productId) {
    try {
      const result = await common.callTransaction(
        `productSeller(${productId})`,
      );
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to fetch details of poduct');
    }
  },

  async getProductDetails(productId) {
    try {
      const result = await common.callTransaction(
        `productDetails(${productId})`,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch seller of the product');
    }
  },
};

module.exports = userOp;
