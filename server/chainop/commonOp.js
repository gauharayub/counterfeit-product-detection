const common = require('../chainop/common');

const commonOp = {
  async getAllProducts(privateKey) {
    try {
      const ownerAddress = await common.returnAccount(privateKey);
      console.log(ownerAddress.address)
      const result = await common.callTransaction(
        `getAllProducts()`,
        privateKey
      );
      // const result = await common.sendTransaction(signedTransaction);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to retrieve all products');
    }
  },

  async returnAccount(privateKey) {
    const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
    return account;
  },
};

module.exports = commonOp;
