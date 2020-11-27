const manager = require('../manager');
const sellerManager = manager.sellerManager;
const sellerOp = require('../chainop/sellerOp')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const sellerController = {
  login: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('no body')
      }
      const { email, password } = req.body
      if (!email || !password) {
        throw new Error('Invalid email or password');
      }

      const rawResponse = await sellerManager.getPasswordByEmail(email);
      const response = rawResponse[0];

      if (await argon2.verify(response, password)) {
        res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));

        return res.send('Login successfully');
      } else {
        throw new Error('Password does not match');
      }
    } catch (error) {
      return next(error);
    }
  },

  signup: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('no body')
      }
      const { email, password, name, details } = req.body

      if (!email || !password) {
        throw new Error('Invalid email or password');
      }
      if (!name || !details) {
        throw new Error('Name or details not provided')
      }

      await sellerManager.checkEmailRegistered(email);

      const hash = await argon2.hash(password);
      const privateKey = await sellerOp.genKey();

      await sellerManager.storeSeller(email, hash, privateKey);

      // add web3 code for registering as a seller in blockchain...
      await sellerOp.register(privateKey, name, details)

      res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));

      res.send('Seller registered successfully');
    } catch (error) {
      return next(error);
    }
  },

  logout: function (req, res, next) {
    res.clearCookie('jwt');
    res.redirect('/');
  },

  sellProduct: function (req, res, next) {
    try {
      if(!req.body){
        throw new Error("No body")
      }
      const {productId,buyerAddress} = req.body
      const {email } = req.email
      
      if(!productId || !buyerAddress|| !email){
        throw new Error("Not All Details")
      }
      const privateKey = await sellerManager.getPrivateKeyByEmail(email)

      await sellerOp.sell(productId, buyerAddress,privateKey)
      res.send("Sold successfully")

    } catch (error) {
      return next(error);
    }
  },
};

module.exports = sellerController;
