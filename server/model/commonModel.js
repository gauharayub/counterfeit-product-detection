const mysql = require('../lib/mysql');

class commonModel {
  static get(email, type) {
    return new Promise((resolve, reject) => {
      let q = `Select * from users where type = '${type}' and email = '${email}'`;
      mysql
        .query(q)
        .then((data) => { resolve(data) })
        .catch((e) => { reject(e) });
    });
  }

  static set(email, hash, privateKey, type) {
    return new Promise((resolve, reject) => {
      let q = `insert into users (email,password,privateKey,type) values ('${email}','${hash}','${privateKey}','${type}')`;
      mysql
        .query(q)
        .then((data) => {resolve(data)})
        .catch((e) => { reject(e) });
    });
  }

  static remove(email) {
    return new Promise((resolve, reject) => {
      let q = `delete from users where email = '${email}'`;
      mysql
        .query(q)
        .then((data) => {resolve(data)})
        .catch((e) => { reject(e) });
    });
  }

  static update(values, email) {
    return new Promise((resolve, reject) => {

      let q = 'update users set '
      Object.keys(values).forEach((key) => {
        q += `${key}='${values[key]}' and `
      })
      q = q.substr(0, q.length - 4)
      q += `where email='${email}'`

      mysql
        .query(q)
        .then((data) => { resolve(data) })
        .catch((e) => { reject(e) });
    });
  }
}

module.exports = commonModel;
