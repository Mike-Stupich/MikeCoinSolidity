var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MikeCoin = artifacts.require("./MikeCoin.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MikeCoin);
};
