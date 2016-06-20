require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
var imageData = require('../data/imageData.json');

imageData = (function generateImageURL(imageDataArray){
	for(var i = 0, j = imageDataArray.length; i< j ; i ++){
		var image = imageDataArray[i];

		image.URL = require('../images/'+ image.fileName);
		imageDataArray[i]=image;
	}
	return imageDataArray;
})(imageData);

// imageData = generateImageURL(imageData);

var ImgFigure = React.createClass({
    render(){
        return (
            <figure className ="img-figure">
                <img src = {this.props.data.URL}
                     alt = {this.props.data.title}                    
                />
                <figcaption>
                    <h2 className = "img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
    
})

class AppComponent extends React.Component {
  render() {    
    var controllerUnits = [],
        imgFigures = [];
   
    imageData.forEach(function(value){
        imgFigures.push(<ImgFigure data={value}/>);
    });

    return (
    	<section className = "stage">
    		<section className = "imgSec">
                {imgFigures}
    		</section>
    		<nav className = "controller-nav">
                {controllerUnits}
    		</nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
