const common = require('./common');
const sellerOp = {
  async sell(productId, buyerAddress, privateKey) {
    try {
      const signedTransaction = await common.signTransaction(
        `sellProduct('${productId}', '${buyerAddress}')`,
        privateKey,
      );

      console.log(productId,buyerAddress,privateKey)

      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to sell product');
    }
  },

  async register(privateKey, name, details) {
    try {
      const signedTransaction = await common.signTransaction(
        `registerSeller ('${name}', '${details}')`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Registration failed');
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

module.exports = sellerOp;
