require('dotenv').config();
const common = require('./chainop/common');

const anasPrivateKey = '0x7cedff99ee1d8d8c66ecf1eb933d1d955246d4419571cca37596f0268eb8ab07'
// common
//   .signTransaction('registerSeller("NS", "Nerd")')
//   .then((response) => {
//     console.log('singedTransaction', response);
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
//   .signTransaction('getAllProducts()',anasPrivateKey)
//   .then((response) => {
//     common
//       .sendTransaction(response)
//       .then((res) => {
//         console.log('Transaction', res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

common
  .callTransaction('getAllProducts()',anasPrivateKey)
  .then((response) => {
    console.log('cal', response);
  })
  .catch((error) => {
    console.log(error);
  });
