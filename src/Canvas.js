import React, { Component } from 'react';

class Canvas extends Component {
    constructor(props){
        super(props);
        // react is giving a warning that this is a useless constructor but it doesn't work without it
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const img = this.refs.img;
        
        img.onload = () => {
            const imgWidth = img.naturalWidth * 0.3;
            const imgHeight = img.naturalHeight * 0.3;
            
            // clears the canvas before drawing image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // draws the random image on the canvas
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        }
    }

    render() {
        // deconstructing props
        const {
            src,
            alt,
            id, 
        } = this.props

        return (
            <div>
                <div className="imageContainer">
                    {/* canvas element that hidden image below gets painted on */}
                    <canvas ref="canvas" id="canvas" width="600" height="600" tabindex="0" aria-label={alt}>
                       Sorry, HTML canvas is not supported on your browser. Try Firefox or Chrome.
                    </canvas>
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