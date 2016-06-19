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

class AppComponent extends React.Component {
  render() {
    return (
    	<section className = "state">
    		<section className = "imgSec">
    		</section>
    		<nav className = "controller-nav">
    		</nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
