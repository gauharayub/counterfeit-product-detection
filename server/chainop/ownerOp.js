const common = require('./common');
const jwt = require('jsonwebtoken');

const ownerOp = {
  async addProduct({ productId,secretId, price, name }, privateKey) {
    try {
      
      const signedTransaction = await common.signTransaction(
        `addProduct('${productId}', '${secretId}', '${price}', '${name}')`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to add product');
    }
  },

  async unblockSeller(sellerAddress, privateKey) {
    try {
      const signedTransaction = await common.signTransaction(
        `unblockSeller('${sellerAddress}')`,
        privateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to unblock seller');
    }
  },
  async transferOwner(sellerPrivateKey, ownerPrivateKey) {
    try {
      const sellerAccount = await common.returnAccount(sellerPrivateKey)
      const sellerAddress = sellerAccount.address
      const signedTransaction = await common.signTransaction(
        `transferOwnership('${sellerAddress}')`,
        ownerPrivateKey,
      );
      const result = await common.sendTransaction(signedTransaction);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to transfer seller');
    }
  },

};

module.exports = ownerOp;
