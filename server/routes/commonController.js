const manager = require('../manager');
const commonManager = manager.commonManager;
const sellerOp = require('../chainop/sellerOp');
const commonOp = require('../chainop/commonOp');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const commonController = {
  login: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('no body');
      }
      const { email, password, type } = req.body;
      if (!email || !password) {
        throw new Error('Invalid email or password');
      }

      const response = await commonManager.getPasswordByEmail(email, type);

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
        next(new Error('no body'));
      }
      const { email, password, name, details, type } = req.body;
      if (!email || !password) {
        next(new Error('Invalid email or password'));
      }
      if (!name || !details) {
        next(new Error('Name or details not provided'));
      }

      await commonManager.checkEmailRegistered(email, type);

      const hash = await argon2.hash(password);
      const privateKey = await sellerOp.genKey();

      await commonManager.storeSeller(email, hash, privateKey, type);
      
      await sellerOp.register(privateKey, name, details);
      
      res.cookie('jwt', jwt.sign(email, process.env.JWT_SECRET_KEY));
      res.send('Seller registered successfully');
    } catch (error) {
      commonManager.removeAccount(email)
        .then(result => {
          next(error)
        }).catch(err => {
          console.log("Failed to remove")
          next(error)
        })
    }
  },

  logout: function (req, res, next) {
    res.clearCookie('jwt');
    res.send();
  },

  getAllProducts: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      const { ownerAddress } = req.body;

      if (!ownerAddress) {
        throw new Error('Details incomplete');
      }

      const products = await commonOp.getAllProducts(ownerAddress);
      res.send(products);
    } catch (error) {
      return next(error);
    }
  },
  
  getProductDetails: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      // secretId of the product extracted from qr code...
      const { productId } = req.body;

      if (!productId) {
        throw new Error('Details incomplete');
      }

      const productDetails = await userOp.getProductDetails(productId);
      res.send({ productDetails: productDetails });
    } catch (error) {
      return next(error);
    }
  },

  getSellerOfProduct: async function (req, res, next) {
    try {
      if (!req.body) {
        throw new Error('Nothing in request object');
      }

      // secretId of the product extracted from qr code...
      const { productId } = req.body;

      if (!productId) {
        throw new Error('Details incomplete');
      }
      const productSeller = await userOp.getSellerOfProduct(productId);
      res.send({ seller: productSeller });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = commonController;
