pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MikeCoin.sol";

contract testMikeCoin {
    function testItMints(){
        MikeCoin mikeCoin = MikeCoin(DeployedAddresses.MikeCoin());

        mikeCoin.mint(10);

        uint expected = 10;

        Assert.equal(mikeCoin.getBalance(), expected, "It should mint 10 MikeCoins");
    }
}