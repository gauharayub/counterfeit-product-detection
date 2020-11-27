require('dotenv').config()
const argon2 = require('argon2');
const Web3 = require('web3');
const web3 = new Web3()
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


console.log(process.env.DB_HOST)
const email = 'anas'
const q = `Select * from users where type = 'seller' and email = '${email}'`
mysql.query(q)
    .then(data => console.log(data))
    .catch(e => console.error(e))


