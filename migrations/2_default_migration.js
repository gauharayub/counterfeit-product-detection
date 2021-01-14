const Counterfeit = artifacts.require('Counterfeit');

module.exports = async function (deployer) {
  await deployer.deploy(Counterfeit);
  let c = await Counterfeit.deployed();

  //arifa Address
  // await c.transferOwnership('0xcb608e1DcEBA308C96aaE1d7c9800ace8cA559B1')

  //kamran Address
  // await c.transferOwnership('0x0cf03d9DABa614eF22cB0Aa96730E91521e6e6d6')
};
