const Counterfeit = artifacts.require('Counterfeit');

module.exports = async function (deployer) {
  await deployer.deploy(Counterfeit);
  const cf = await Counterfeit.deployed()

  // console.log(cf)
  cf.transferOwnership('0x2F2eDB8d6786080B344Aa0E96054321D60E6f3c3')
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log("Error1"))
  // cf.registerSeller('Anas','Owner').catch(error=>console.log("Error2"))
};
