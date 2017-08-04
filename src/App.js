import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import MikeCoinContract from '../build/contracts/MikeCoin.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //storageValue: 0,
      myBalance:0,
      web3: null
    }
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
      //this.instantiateContract()
      this.launchMikeCoin();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  /*instantiateContract() {

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }*/

  launchMikeCoin(){
    const contract = require('truffle-contract');
    const MikeCoin = contract(MikeCoinContract);
    MikeCoin.setProvider(this.state.web3.currentProvider);

    var MikeCoinInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      MikeCoin.deployed({from:accounts[0]}).then(function (instance) {
        MikeCoinInstance = instance;

        return MikeCoinInstance.mint(10, accounts[0], { from:accounts[0] });
      }).then(function(){
        return MikeCoinInstance.getBalance.call({ from:accounts[0] })
      }).then(function(balance){
        console.log(balance);
        return this.setState({myBalance: balance.toNumber() })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <p>My balance is: {this.state.myBalance} MikeCoins</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
