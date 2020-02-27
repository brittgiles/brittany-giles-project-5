import React, { Component } from 'react';
import axios from 'axios';
//import Header from './Header.js';


class App extends Component {
  constructor(){
    super();

    this.state={
      art: [],
      randomArt: {},
    }
    //console.log('this state art:', this.state.art);
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      responseType: 'json',
      params: {
        key: `rDVuMIWC`,
        format:'json',
        q: 'person',
        ps: '10', //later update to 100 for the number of objects to be returned
      }
    }).then((response) =>{
      // reassigning response to be more specific to clean up the data
      response = response.data.artObjects;

      // setting a variable to hold the array of objects returned from API call
      // const artArray = response;
      //console.log('art array:', artArray);

      //randomly selecting one object from the array
      
      this.setState({
        art: response,
      })
      
      // removing the selected art object from the array
      // const removeArtObject = (index) => {
      //   artArray.splice(index, 1);
      // }

    })
  }

  handleClick = () => {
    const randomArtObject = this.state.art[Math.floor(Math.random() * this.state.art.length)];
    console.log('randomly selected art object from array:', typeof randomArtObject);

    this.setState({

      randomArt: randomArtObject,
    })

  }
  
  render() {
    console.log('this.state.art in render',this.state.art);
    console.log('this.state.randomArt in render',this.state.randomArt);
    //console.log('image url:', this.state.randomArt.webImage.url);
    return (
      <div>
        <h1>blah blah blah</h1>
          <button onClick={this.handleClick}>get art</button>
        
              <div>
          <img src={this.state.randomArt.webImage !== undefined ? this.state.randomArt.webImage.url : '' } alt={this.state.randomArt.longTitle} />
                <button>new image</button>
                <button>reset</button>
              </div>
      </div>
    )
  }
}

export default App;

// if i'm going to get rid of the button then
