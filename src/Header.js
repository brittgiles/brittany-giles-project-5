import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <div id="squareOne" className="square"></div>
          <div id="squareTwo" className="square"></div>
          <h1>Memeseum</h1>
          <p>A generator to create your own reappraisel of art, history, and culture.</p>
        </div>
      </header>
    );
  }
}

export default Header;