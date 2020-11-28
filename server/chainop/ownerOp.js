const common = require('./common');

const ownerOp = {
  async addProduct({ productId, secretId, price, name, details }, privateKey) {
    try {
      const signedTransaction = await common.signTransaction(
        `addProduct(${productId}, ${secretId}, ${price}, ${name}, ${details})`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to add product');
    }
  },
  async genKey() {
    try {
      return await common.generatePrivateKey();
    } catch (error) {
      console.log(error.message);
      throw new Error('failed to generate keys');
    }
  },
};

module.exports = ownerOp;
