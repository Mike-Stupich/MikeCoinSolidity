pragma solidity ^0.4.2;

contract MikeCoin {
    mapping(address=>uint) public balances;
    address public minter; 


    event transfer(address from, address to, uint amount);

    function MikeCoin(){
        minter = msg.sender;
    }

    function mint(uint amount, address receiver){
        if (msg.sender == minter)
            balances[receiver] += amount;
    }

    function transferFunds(uint amount, address receiver)returns (bool success){
        if (balances[msg.sender] < amount)
            return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        transfer(msg.sender, receiver, amount);
        return true;
    }   

    function getBalance() returns (uint amount){
        return balances[msg.sender];
    }
}