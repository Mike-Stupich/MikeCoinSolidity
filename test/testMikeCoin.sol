pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MikeCoin.sol";

contract TestMikeCoin {
    function testItMints(){
        MikeCoin mikeCoin = MikeCoin(DeployedAddresses.MikeCoin());

        Assert.equal(mikeCoin.getBalance(), 0, "It should mint 10 MikeCoins");
    }
}