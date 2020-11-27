require('dotenv').config();
const common = require('./chainop/common');

common
  .signTransaction(undefined, 'registerSeller("NS", "Nerd")')
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
  .signTransaction(undefined, 'registerSeller("NS", "Nerd")')
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
  .callTransaction(undefined, 'whatIsProduct(0)')
  .then((response) => {
    console.log('cal', response);
  })
  .catch((error) => {
    console.log(error);
  });
