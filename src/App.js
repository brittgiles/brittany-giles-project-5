import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';


class App extends Component {
  constructor(){
    super();

    this.state={
      art: [],
      randomArt: {},
    }
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      responseType: 'json',
      params: {
        key: `rDVuMIWC`,
        format:'json',
        q: 'portrait',
        ps: '200', 
      }
    }).then((response) =>{
      // reassigning response to be more specific to clean up the data
      response = response.data.artObjects;

      // setting a variable to hold the array of objects returned from API call
      // const artArray = response;
      //console.log('art array:', artArray);
      
      // updating state with the response from API call
      this.setState({
        art: response,
      })
      console.log(response);
    })
  }

  // on click of button, get a random piece of art from API
  handleClick = () => {
    const randomArtObject = this.state.art[Math.floor(Math.random() * this.state.art.length)];
    //console.log('randomly selected art object from array:', typeof randomArtObject);

    this.setState({
      randomArt: randomArtObject,
    })
  }

  render() {
    //console.log('this.state.art in render',this.state.art);
    //console.log('this.state.randomArt in render',this.state.randomArt);
    //console.log('image url:', this.state.randomArt.webImage.url);
    return (
      <div>
        <Header />
          <div className="introArea wrapper">
            <p>Create your own reappraisel of art, history, and culture.</p>
            <button id="getArtButton" onClick={this.handleClick}>get art</button>
          </div>
          <div className="flexParent wrapper">
            {/* <canvas id="canvas" width="1024" height="1024">

            </canvas> */}
            <div className="flexChild">
              <input type="text" placeholder="type your text here" id="customText" />
              <button>reset</button>
            </div>
            <div className="imageContainer">
              <img src={this.state.randomArt.webImage !== undefined ? this.state.randomArt.webImage.url : '' } alt={this.state.randomArt.longTitle} id="memeImage" />
            </div>
            
          </div>
          <Footer />
      </div>
    )
  }
}

export default App;

// if i'm going to get rid of the button then have ternary operator that says if webImage is undefined then show nothing or "loading" and then move the stuff in the handleClick method to the .then
// alternately COULD have an anonymous callback function after setting state with the random art piece to make sure that things happen before the page load
