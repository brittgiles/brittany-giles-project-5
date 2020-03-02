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
      // console.log(response);
    })

    const dbRef = firebase.database().ref();

    // getting and saving the response from the Firebase database
    dbRef.on('value', (caption) => {
      const captionFromDb = caption.val();
      console.log(captionFromDb);

      // empty array to hold the caption text
      // const stateToBeSet = [];
      

      // pulling the caption text out of the object and pushing to the empty array
      for (let key in captionFromDb) {
        this.setState({
          caption: captionFromDb[key],
          dbKey: key,
        });
      }

      // converting the array from the user input to a string
      // const stateToBeSetString = stateToBeSet.toString();
      // console.log('state to be set string',stateToBeSetString);
      // this.setState({
      //   caption: stateToBeSetString,
      // })
    })

  }

  // on click of button, get a random piece of art from API
  handleClick = () => {
    const randomArtObject = this.state.art[Math.floor(Math.random() * this.state.art.length)];

    this.setState({
      randomArt: randomArtObject,
    })
    //console.log(randomArtObject);
  }

  // listens for change in the user input text box
  handleChange = (e) => {

    this.setState({
      userInput: e.target.value,
    })
  }

  handleFormSubmit = (e) => {
    // preventing the form from refreshing the page
    e.preventDefault();

    // creating a reference to the firebase database
    const dbRef = firebase.database().ref();

    dbRef.push(this.state.userInput);

    this.setState({
      userInput: '',
    })

  }

  resetPage = (dbKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child(dbKey).remove();
    
    this.setState({
      caption: '',
      dbKey: '',
    })
  }

  render() {
    //console.log(this.state.userInput);
    // console.log('user input: ', this.state.caption);
    return (
      <div>
        <Header />
          <div className="introArea wrapper">
            <p>Create your own reappraisel of art, history, and culture.</p>
            <button id="getArtButton" onClick={this.handleClick}>new image</button>
          </div>
          <div className="flexParent wrapper">
            <div className="flexChild">
              {/* setting value of this.state.userInput for accessibility */}
              <form action="submit" onSubmit={this.handleFormSubmit}>
                <input type="text" placeholder="type your text here" id="customText" onChange={this.handleChange} value={this.state.userInput}  />
                <button type="submit">submit</button>
              </form>
            <button type="reset" onClick={() => { this.resetPage(this.state.dbKey) }}>reset</button>
            </div>
            <div className="memeCaption">{this.state.caption}</div>
            {this.state.randomArt.webImage && <Canvas src={this.state.randomArt.webImage.url} alt={this.state.randomArt.longTitle} id={'memeImage'} userCaption={this.state.caption} /> }
            
            {/* <button type="reset" onClick={() => {this.resetPage()}}>reset</button> */}
          </div>

          <Footer />
      </div>
    )
  }
}

export default App;

// if i'm going to get rid of the button then have ternary operator that says if webImage is undefined then show nothing or "loading" and then move the stuff in the handleClick method to the .then
// alternately COULD have an anonymous callback function after setting state with the random art piece to make sure that things happen before the page load
