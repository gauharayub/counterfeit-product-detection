'use strict';
const Web3 = require('web3');
const web3 = new Web3();

const models = require('../models');

const ownerModel = models.ownerModel;

const ownerManager = {
  checkEmailRegistered: function (email) {
    return new Promise((resolve, reject) => {
      ownerModel
        .get(email)
        .then((response) => {
          if (response && response.length === 0) {
            return resolve(true);
          }
          throw new Error('email already exist');
        })
        .catch((e) => {
          throw reject(e);
        });
    });
  },
  async getPrivateKeyByEmail(email){
    try{
      const result = await sellerModel.get(email)
      if (!result || result.length === 0) {
        throw new Error('email not found in user table');
      }
      return result[0].privateKey
    }
    catch(error){
      console.log(error.message);
      throw new Error("Failed to get private key")
    }
  },
  generatePrivateKey: async function () {
    try {
      const newAccount = await web3.eth.accounts.create();
      return newAccount.privateKey;
    } catch (error) {
      console.log(error);
      throw new Error('failed to create new private key');
    }
  },
  storeOwner: function (email, hash, privateKey) {
    return new Promise((resolve, reject) => {
      ownerModel
        .set(email, hash, privateKey)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          throw reject(error);
        });
    });
  },

  getPasswordByEmail: function (email) {
    return new Promise((resolve, reject) => {
      ownerModel
        .get(email)
        .then((response) => {
          if (!response || response.length === 0) {
            throw new Error('email not found in user table');
          }

          return resolve(response);
        })
        .catch((e) => {
          throw reject(e);
        });
    });
  },
};

module.exports = ownerManager;
