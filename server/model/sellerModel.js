
const mysql = require('../lib/mysql');

class sellerModel {

    static get(email) {
        return newPromise((resolve, reject) => {
            let q = `Select * from users where type = 'seller' and email = '${email}'`
            mysql.query(q)
                .then(data => resolve(data))
                .catch(e => reject(e))
        })
    }

    static set(email,hash,privateKey,type='seller') {
        return newPromise((resolve, reject) => {
            let q = `insert into users (email,password,privateKey,type) values ('${email}','${hash}','${privateKey}','${type}')`
            mysql.query(q)
                .then(data => resolve(data))
                .catch(e => reject(e))
        })
    }
};

module.exports = sellerModel;