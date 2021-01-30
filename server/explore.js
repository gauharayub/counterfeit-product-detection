require('dotenv').config();
const common = require('./chainop/common');

const anasPrivateKey = '0x7bbadfa66cc659d56bc887a32fffaee29f9f051f878b2184c506c423bc98a826'
const anas40 = '0x0cf34668e85ba533e79aabe64708fc2f55716a8d78f535e42de49b71712d9d55'
const anas40Public = '0xD2c4b1436588863E95088422502844012c6cE047'
// address: '0x2F2eDB8d6786080B344Aa0E96054321D60E6f3c3',
  // privateKey: '0x7cedff99ee1d8d8c66ecf1eb933d1d955246d4419571cca37596f0268eb8ab07'
const keyArifa = '0x03936880dd626bfdc6d848176b2c44e31cb3719b005741c3548066907c812492'
const keyKamran = '0x82a1c1b0f1c73a84aea16c4ec6416f9fe7cdd9a0c8344f0a86d1c4248b34a074'
// common
//   .signTransaction('registerSeller("Anas", "Owner")',anasPrivateKey)
//   .then((response) => {
//     console.log(response);
//     // common.sendTransaction(response).then((res) => {
//     //   console.log(res)
//     // })
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// common
//   .getBalance()
//   .then((res) => {
//     console.log('balance', res);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// common
//   .callTransaction('productSeller(0)',anas40)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// common.generatePrivateKey().then(res => {
//   console.log(res);
// })

common
  .returnAccount(keyKamran)
  .then((response) => {
    console.log('cal', response);
  })
  .catch((error) => {
    console.log(error);
  });
  
