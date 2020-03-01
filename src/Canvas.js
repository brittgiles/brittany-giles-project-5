import React, { Component } from 'react';
//refactor into canvas, pass input text as props
class Canvas extends Component {
    constructor(props){
        super(props)
    }

    componentDidUpdate(){
        // when the Image Component updates, draw the canvas
        const canvas = document.getElementById('canvas');
        const canvasImage = document.getElementById('memeImage');
        const ctx = canvas.getContext('2d');
        const imageWidth = canvasImage.width;
        const imageHeight = canvasImage.height;

        ctx.drawImage(canvasImage, 0, 0, imageWidth * 0.3, imageHeight * 0.3);
        //console.log('did mount', canvas, canvasImage, ctx);
    }

    render() {
        // deconstructing props
        const {
            src,
            alt,
            id
        } = this.props

        return (
            <div>
                <div className="imageContainer">
                    <canvas id="canvas" width="600" height="600">
                        Sorry, HTML canvas is not supported on your browser. Try Firefox or Chrome.
                    </canvas>
                    {/* <img src={this.state.randomArt.webImage !== undefined ? this.state.randomArt.webImage.url : ''} alt={this.state.randomArt.longTitle} id="memeImage" /> */}
                    {/* add aria hidden */}
                </div>
                <div className="hidden">
                    <img src={src} alt={alt} id={id} />
                </div>
            </div>
            );
        }
    }
    
export default Canvas;