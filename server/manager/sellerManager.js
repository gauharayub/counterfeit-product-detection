'use strict';
const Web3 = require('web3');
const web3 = new Web3()

const models = require('../models');

const sellerModel = models.sellerModel;

const sellerManager = {

	checkEmailRegistered: function (email) {
		return new Promise((resolve, reject) => {
			sellerModel.get(email)
				.then(response => {
					if (response && response.length === 0) {
						return resolve(true)
					}
					throw new Error(`email already exist`);
				})
				.catch(e => {
					throw reject(e);
				});
		});
	},
	generatePrivateKey: async function () {
		try {
			const newAccount = await web3.eth.accounts.create();
			return newAccount.privateKey
		}
		catch (error) {
			console.log(error)
			throw new Error("failed to create new private key")
		}
	},
	storeSeller: function (email, hash, privateKey) {
		return new Promise((resolve, reject) => {
			sellerModel.set(email, hash, privateKey).then(response => {
				return resolve(response)
			}).catch(error => {
				throw reject(error)
			})
		})
	},

	getPasswordByEmail: function (email) {

		return new Promise((resolve, reject) => {
			sellerModel.get(email)
				.then(response => {
					if (!response || response.length === 0) {
						throw new Error(`email not found in user table`);
					}

					return resolve(response);
				})
				.catch(e => {
					throw reject(e);
				});
		});
	}
};

module.exports = sellerManager;