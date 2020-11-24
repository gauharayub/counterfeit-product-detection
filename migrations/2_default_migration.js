const Counterfeit = artifacts.require("Counterfeit");

module.exports = function (deployer) {
    deployer.deploy(Counterfeit);
};
