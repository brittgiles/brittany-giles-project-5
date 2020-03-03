import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import Canvas from './Canvas.js';
import firebase from './firebaseApp';



class App extends Component {
  constructor(){
    super();

    this.state={
      art: [],
      randomArt: {},
      userInput: '',
      caption: '',
      dbKey: '',
    }
  }

  componentDidMount(){
    // axios call for image data from API
    axios({
      method: 'GET',
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      responseType: 'json',
      params: {
        key: `rDVuMIWC`,
        format:'json',
        q: 'portrait',
        ps: '200',
        imgonly: true,
      }
    }).then((response) =>{
      // reassigning response to be more specific to clean up the data
      response = response.data.artObjects;
      
      // updating state with the response from API call
      this.setState({
        art: response,
      }, () => {
          const randomArtObject = this.state.art[Math.floor(Math.random() * this.state.art.length)];

          this.setState({
            randomArt: randomArtObject,
          })
      })
    })

    const dbRef = firebase.database().ref();
    // getting and saving the response from the Firebase database
    dbRef.on('value', (caption) => {
      const captionFromDb = caption.val();

      // pulling the caption text out of the object and pushing to the empty array
      for (let key in captionFromDb) {
        // passing the text and the key to state
        this.setState({
          caption: captionFromDb[key],
          dbKey: key,
        });
      }
    })
  }

  // on click of button, get a random piece of art from API
  handleClick = () => {
    const randomArtObject = this.state.art[Math.floor(Math.random() * this.state.art.length)];

    this.setState({
      randomArt: randomArtObject,
    })
  }

  // listens for change in the user input text box
  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  // on form submit
  handleFormSubmit = (e) => {
    // preventing the form from refreshing the page
    e.preventDefault();

    // creating a reference to the firebase database
    const dbRef = firebase.database().ref();

    dbRef.push(this.state.userInput);
    // on form submit, empty the user input
    this.setState({
      userInput: '',
    })
  }

  // on click of reset button
  resetButton = (dbKey) => {
    const dbRef = firebase.database().ref();
    // remove input from firebase
    dbRef.child(dbKey).remove();
    // reset state to empty string
    this.setState({
      caption: '',
      dbKey: '',
    })
  }

  render() {
    return (
      <div>
        <Header />
          <div className="contentContainer wrapper">
            <div className="flexChild">
              {/* setting value of this.state.userInput for accessibility */}
              <form action="submit" onSubmit={this.handleFormSubmit}>
                {/* create for SR only label */}
                <label htmlFor=""></label>
                <input type="text" placeholder="Type your caption here" id="customText" onChange={this.handleChange} value={this.state.userInput}  />
                <div className="buttonContainer">
                  <button type="submit">Submit</button> 
                {this.state.dbKey &&
                  <button type="reset" onClick={() => { this.resetButton(this.state.dbKey) }}>Reset</button>}
                </div>
              </form>
              {/* only display reset button when there is something in the database */}
              <button id="getArtButton" onClick={this.handleClick}>New Image</button>
            </div>
            <div className="canvasContainer">
            
              {this.state.caption && <div className="memeCaption">{this.state.caption}</div>}
              {this.state.randomArt.webImage && <Canvas src={this.state.randomArt.webImage.url} alt={this.state.randomArt.longTitle} id={'memeImage'} /> }
            </div>
          </div>
          <Footer />
      </div>
    )
  }
}

export default App;
