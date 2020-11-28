const manager = require('../manager');
const commonManager = manager.commonManager;
const sellerOp = require('../chainop/sellerOp');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const commonController = {

  login: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('no body');
      }
      const { email, password,type } = req.body;
      if (!email || !password) {
        throw new Error('Invalid email or password');
      }

      const response= await commonManager.getPasswordByEmail(email,type);

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
        throw new Error('no body');
      }
      const { email, password, name, details,type } = req.body;

      if (!email || !password) {
        throw new Error('Invalid email or password');
      }
      if (!name || !details) {
        throw new Error('Name or details not provided');
      }

      await commonManager.checkEmailRegistered(email,type);

      const hash = await argon2.hash(password);
      const privateKey = await sellerOp.genKey();

      await commonManager.storeSeller(email, hash, privateKey,type);

      // add web3 code for registering as a seller in blockchain...
      await sellerOp.register(privateKey, name, details);

      res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));

      res.send('Seller registered successfully');
    } catch (error) {
      return next(error);
    }
  },

  logout: function (req, res, next) {
    res.clearCookie('jwt');
    res.redirect('/');
  }
};

module.exports = commonController;
