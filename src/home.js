import React, { Component } from 'react'

export function renderHomePage() {
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
            </div>
          </div>
        </main>
      </div>
    );
}