<<<<<<< HEAD
require('dotenv').config();
const argon2 = require('argon2');
const Web3 = require('web3');
const web3 = new Web3();
const mysql = require('./lib/mysql');

// const password2 = "hoala ndsfiashddfasdfknasjd5439#$%@$#adfkljasdjf290%@#$"

// async function test() {

//     const hash = await argon2.hash(password2)

//     console.log(hash, hash.length)

//     const newAccount = await web3.eth.accounts.create();
//     console.log(newAccount)
//     console.log(newAccount.privateKey.length)
// }
// test()

console.log(process.env.DB_HOST);
const email = 'anas';
const q = `Select * from users where type = 'seller' and email = '${email}'`;
mysql
  .query(q)
  .then((data) => console.log(data))
  .catch((e) => console.error(e));
=======
require('dotenv').config()
const common = require('./chainop/common')

common.signTransaction(undefined, 'registerSeller("NS", "Nerd")')
    .then((response) => {
        console.log("singedTransaction", response)
    })
    .catch(error => {
        console.log(error)
    })


common.getBalance()
    .then(res => {
        console.log("balance", res);
    }).catch(error => {
        console.log(error)
    })


common.signTransaction(undefined, 'registerSeller("NS", "Nerd")')
    .then((response) => {
        common.sendTransaction(response).then(res => {
            console.log("Transaction", res);
        }).catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })


common.callTransaction(undefined, 'whatIsProduct(0)')
    .then((response) => {
        console.log("cal", response);
    }).catch(error => {
        console.log(error)
    })
>>>>>>> 6fa5071f27547dea8e830bf301e255c85dc479a6
