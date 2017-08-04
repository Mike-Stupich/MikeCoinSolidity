import React, { Component } from 'react'
import MikeCoinContract from '../build/contracts/MikeCoin.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


const contract = require('truffle-contract');
const MikeCoin = contract(MikeCoinContract);
var MikeCoinInstance;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myBalance:0,
      web3: null
    }
    this.mintTokens = this.mintTokens.bind(this);
    this.transferTo = this.transferTo.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.launchToken();
      this.getCurrentBalance();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  launchToken(){
    MikeCoin.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) => {
      MikeCoin.new({from:accounts[0], gas:1000000})
        .then((instance) => {
          console.log(instance);
        }).catch((err)=>{
          console.log(err);
        })
    })
  }

  getCurrentBalance(){
    MikeCoin.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) => {
      MikeCoin.deployed()
        .then((instance) => {
          MikeCoinInstance = instance;
          return MikeCoinInstance.getBalance.call({from:accounts[0]});
        })
        .then((balance) => {
          return this.setState({ myBalance: balance.toNumber() });
        })
    })
  }

  mintTokens(){
    MikeCoin.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) => {
      MikeCoin.deployed()
      .then((instance) => {
        MikeCoinInstance = instance;
        return MikeCoinInstance.mint(10, accounts[0], { from:accounts[0] });
      })
      .then(() => {
        return MikeCoinInstance.getBalance.call({ from:accounts[0] })
      })
      .then((balance)=> {
        return this.setState({ myBalance: balance.toNumber() })
      })
    })
  }

  transferTo(addr){
    MikeCoin.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) =>{
      MikeCoin.deployed()
        .then((instance)=>{
          MikeCoinInstance = instance;
          return MikeCoinInstance.transferFunds(1,accounts[addr], {from:accounts[0]})
        })
        .then(()=>{
          return MikeCoinInstance.getBalance.call({from:accounts[0]});
        })
        .then((balance) => {
          return this.setState({myBalance: balance.toNumber() })
        })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Home</a>
            <a href="#" className="pure-menu-heading pure-menu-link">Specs</a>
            <a href="#" className="pure-menu-heading pure-menu-link">Download</a>
            <a href="#" className="pure-menu-heading pure-menu-link">Roadmap</a>
            <a href="#" className="pure-menu-heading pure-menu-link">Whitepaper</a>
            <a href="#" className="pure-menu-heading pure-menu-link">Community</a>
            <a href="#" className="pure-menu-heading pure-menu-link">FAQ</a>
        </nav>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>My balance is: {this.state.myBalance} MikeCoins</p>
              <div className="">
                <p>Click this button to transfer 1 MikeCoin to address[1]</p>
                <button onClick={()=> this.transferTo(1)}>Transfer MikeCoin</button>
              </div>
              <div>
                <p>Click this button to mint 10 more tokens to address[0]</p>
                <button onClick={this.mintTokens}>Mint Tokens</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
