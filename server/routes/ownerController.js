const manager = require('../manager');
const commonManager = manager.commonManager;
const ownerOp = require('../chainop/ownerOp');
const ownerController = {
  addProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const {values}  = req.body;
      const email = req.email
      if (!email || !values) {
        throw new Error('Details incomplete');
      }

      const privateKey = await commonManager.getPrivateKeyByEmail(email, 'owner');
    
      await ownerOp.addProduct(values, privateKey);
  
      res.send('Product added successfully');
    } catch (error) {
       next(error);
    }
  },
  unblockSeller: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { sellerAddress } = req.body;
      const email = req.email
      if (!sellerAddress || !email) {
        throw new Error('Details incomplete');
      }

      const privateKey = commonManager.getPrivateKeyByEmail(email, 'owner');
      await ownerOp.unblockSeller(sellerAddress, privateKey);
      res.send('Seller unblocked successfully');
    } catch (error) {
       next(error);
    }
  },
  async transferOwnership(req, res, next) {
    try {
      res.send('FUNCTION not ready yet');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Failed to transfer ownership');
    }
  },
  async addOwner(req,res,next){
    try{
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { email } = req.body;
      const currentOwner = req.email

      if (!email || ! currentOwner) {
        throw new Error('Details incomplete');
      }

      const seller = await commonManager.checkSeller(email, 'seller');
      const ownerPrivateKey = await commonManager.getPrivateKeyByEmail(currentOwner, 'owner');
      
      console.log("Seller :: ",seller.privateKey, ownerPrivateKey);
      //so seller is registered next step to make him owner

      await ownerOp.transferOwner(seller.privateKey, ownerPrivateKey)
      

      await commonManager.updateDetails({ type: 'owner' }, email)
      await commonManager.updateDetails({ type: 'seller' }, currentOwner)
      
      res.send("Changed Owner Successfully")
    }
    catch (error){
      console.log(error.message);
      res.status(500).send('Failed to add owner');
    }
  }
};

module.exports = ownerController;
