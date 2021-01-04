const Counterfeit = artifacts.require('Counterfeit');

module.exports = async function (deployer) {
  deployer.deploy(Counterfeit);
};
