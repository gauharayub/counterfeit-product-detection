'use strict';

const models = require('../models');

const sellerModel = models.sellerModel;

const sellerManager = {

    checkEmailRegistered: function(email){

        return new Promise((resolve, reject)=>{
			sellerModel.get(email).then((response)=>{
				if(!response || response.length  ===  0){
					throw new Error(`email not found in user table`);
				}
				return resolve(response);
			  })
			.catch(e=>{
				throw reject(e);
			});
		});
    },
    generatePrivateKey:function(){

    },
    storeSeller:function(email,hash,privateKey){

    },

	getPasswordByEmail : function(email){

		const options ={
			filters: {
				email : email
			}
		};

		return new Promise((resolve, reject)=>{
			sellerModel.get(options).then((response)=>{
				if(!response || response.length  ===  0){
					throw new Error(`email not found in user table`);
				}

				return resolve(response);
			  })
			.catch(e=>{
				throw reject(e);
			});
		});
	}
};

module.exports = sellerManager;