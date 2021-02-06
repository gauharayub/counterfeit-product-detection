const Counterfeit = artifacts.require('Counterfeit');
const Buy = artifacts.require('Buy');

module.exports = async function (deployer) {
  await deployer.deploy(Counterfeit);
  await deployer.deploy(Buy);
  const buy = await Buy.deployed();
  const counterfeit = await Counterfeit.deployed();

  await buy.setMainContract(counterfeit.address);
  await counterfeit.setSideContract(buy.address);
};
