var MikeCoin = artifacts.require("./MikeCoin.sol");

contract('MikeCoin', function(accounts){
    it("...should mint 10 MikeCoins to address[0].", function(){
        return MikeCoin.deployed().then(function(instance){
            MikeCoinInstance = instance;

            return MikeCoinInstance.mint(10, accounts[0], {from:accounts[0] });
        }).then(function(){
            return MikeCoinInstance.getBalance.call();
        }).then(function(balance){
            assert.equal(balance, 10, "The  coin was not properly minted");
        });
    })
});