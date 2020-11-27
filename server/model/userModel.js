const mysql = require('../lib/mysql');

class userModel {
  static get(email) {
    return new Promise((resolve, reject) => {
      let q = `Select * from users where type = 'user' and email = '${email}'`;
      mysql
        .query(q)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  static set(email, hash, privateKey, type = 'user') {
    return new Promise((resolve, reject) => {
      let q = `insert into users (email,password,privateKey,type) values ('${email}','${hash}','${privateKey}','${type}')`;
      mysql
        .query(q)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }
}

module.exports = userModel;
