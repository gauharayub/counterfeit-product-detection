const common = require('../chainop/common');

const commonOp = {
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
  },
};

module.exports = commonOp;
