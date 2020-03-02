import React, { Component } from 'react';
//refactor into canvas, pass input text as props
class Canvas extends Component {
    constructor(props){
        super(props);
        //console.log('props in canvas constructor',this.props);
    }

    // componentDidUpdate(){
    //     // when the Image Component updates, draw the canvas
    //     const canvas = document.getElementById('canvas');
    //     const canvasImage = document.getElementById('memeImage');
    //     const ctx = canvas.getContext('2d');
    //     const imageWidth = canvasImage.width;
    //     const imageHeight = canvasImage.height;

    //     ctx.drawImage(canvasImage, 0, 0, imageWidth * 0.3, imageHeight * 0.3);
    //     console.log('did mount', canvas, canvasImage, ctx);
    // }

    componentDidMount(){
        // const canvas = document.getElementById('canvas');
        // const img = document.getElementById('memeImage');
        // const ctx = canvas.getContext('2d');
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = this.refs.img;
        //const userInputValue = this.state.userInputValue
        
        img.onload = () => {
            const imgWidth = img.naturalWidth * 0.3;
            const imgHeight = img.naturalHeight * 0.3;
            
            // clears the canvas before drawing image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // draws the random image on the canvas
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            // ctx.font = "30px Arial";
            // ctx.textAlign = "center";
            //ctx.fillText(this.state.userInputValue, 10, 50);
            //console.log('caption in canvas component', props.userCaption);
        }
    }

    render() {
        // deconstructing props
        const {
            src,
            alt,
            id, 
            //userCaption
        } = this.props

        //console.log('caption in canvas render', userCaption);

        // const test = this.refs.canvas;
        // console.log('this is the canvas', test)
        // const ctx = canvas.getContext('2d');
        
        // userCaption.onload = () => {
        //     ctx.font = "30px Arial";
        //     ctx.textAlign = "center";
        //     ctx.fillText(userCaption, 10, 50);
        // }


        return (
            <div>
                <div className="imageContainer">
                    <canvas ref="canvas" id="canvas" width="600" height="600">
                        Sorry, HTML canvas is not supported on your browser. Try Firefox or Chrome.
                    </canvas>
                    {/* <img src={this.state.randomArt.webImage !== undefined ? this.state.randomArt.webImage.url : ''} alt={this.state.randomArt.longTitle} id="memeImage" /> */}
                    {/* add aria hidden */}
                </div>
                {/* adding class of hidden to the image div so the image can be passed to the canvas, but the image doesn't show up on the page twice  */}
                <div className="hidden">
                    <img src={src} alt={alt} id={id} ref="img" />
                </div>
            </div>
            );
        }
    }
    
export default Canvas;