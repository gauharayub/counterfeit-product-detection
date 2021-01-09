
require('dotenv').config();
const common = require('./chainop/common')

const privateKeyGak = '0x6435518a2c28099931812c698dd49bfae7638cedf2867a6d30f5357ce6f13f64'
const privateKeyAnas= '0x7cedff99ee1d8d8c66ecf1eb933d1d955246d4419571cca37596f0268eb8ab07'
const gak16 = '0xbabc952193ba0094f92698a5001283784e0b175257b90181e6f0022912c7dd8f'

const anas50='0xa14d5053507b7e52332755160f28fcbc3d63bbf7b212536aa5a485c785356806'
common.returnAccount(gak16).then(account=>{
    console.log(account.address);
})
