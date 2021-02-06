const Counterfeit = artifacts.require('Counterfeit');
const Buy = artifacts.require('Buy');

module.exports = async function (deployer) {
  await deployer.deploy(Counterfeit);
  await deployer.deploy(Buy, '0xD216153c06E857cD7f72665E0aF1d7D82172F494');
  const buy = await Buy.deployed();
  const counterfeit = await Counterfeit.deployed();

  await buy.setMainContract(counterfeit.address);
  await counterfeit.setSideContract(buy.address);
};
