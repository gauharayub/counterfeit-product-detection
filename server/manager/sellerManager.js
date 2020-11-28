'use strict';
const Web3 = require('web3');
const web3 = new Web3();

const models = require('../model');

const sellerModel = models.sellerModel;

const sellerManager = {
  checkEmailRegistered: function (email) {
    return new Promise((resolve, reject) => {
      sellerModel
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
  storeSeller: function (email, hash, privateKey) {
    return new Promise((resolve, reject) => {
      sellerModel
        .set(email, hash, privateKey)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          throw reject(error);
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
  }
  ,
  getPasswordByEmail: function (email) {
    return new Promise((resolve, reject) => {
      sellerModel
        .get(email)
        .then((response) => {
          if (!response || response.length === 0) {
            throw new Error('email not found in user table');
          }
          //check and return only email 
          return resolve(response[0].password);
        })
        .catch((e) => {
          throw reject(e);
        });
    });
  },
};

module.exports = sellerManager;
