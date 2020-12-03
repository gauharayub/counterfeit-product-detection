
require('dotenv').config();
const common = require('./chainop/common')

const privateKeyGak = '0x6435518a2c28099931812c698dd49bfae7638cedf2867a6d30f5357ce6f13f64'
const privateKeyAnas= '0x7cedff99ee1d8d8c66ecf1eb933d1d955246d4419571cca37596f0268eb8ab07'

common.returnAccount(privateKeyAnas).then(account=>{
    console.log(account);
})
