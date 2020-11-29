require('dotenv').config();
const common = require('./chainop/common');

common
  .signTransaction('registerSeller("NS", "Nerd")')
  .then((response) => {
    console.log('singedTransaction', response);
  })
  .catch((error) => {
    console.log(error);
  });

common
  .getBalance()
  .then((res) => {
    console.log('balance', res);
  })
  .catch((error) => {
    console.log(error);
  });

common
  .signTransaction('registerSeller("NS", "Nerd")')
  .then((response) => {
    common
      .sendTransaction(response)
      .then((res) => {
        console.log('Transaction', res);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

common
  .callTransaction('whatIsProduct(0)')
  .then((response) => {
    console.log('cal', response);
  })
  .catch((error) => {
    console.log(error);
  });
