
const mysql = require('../lib/mysql');

class sellerModel {

    static get(email) {
        return newPromise((resolve, reject) => {
            let q = `Select * from users where type = seller and email = ${email}`
            mysql.query(q)
                .then(data => resolve(data))
                .catch(e => reject(e))
        })
    }

    //not ready
    static set(email,hash,privateKey) {
        return newPromise((resolve, reject) => {
            let q = `Select * from users where type = seller and email = ${email}`
            mysql.query(q)
                .then(data => resolve(data))
                .catch(e => reject(e))
        })
    }

   

};

module.exports = sellerModel;