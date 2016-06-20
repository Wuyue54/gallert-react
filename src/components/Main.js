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
  Constant:{
    centerPos: {
        left:0,
        right: 0
    },
    hPosRange: {
        leftSecX: [0,0],
        rightSecX: [0,0].
        y: [0,0]
    },
    vPosRange: {
        x: [0,0].
        topY: [0,0]
    }
  }  
  componentDidMount: function(){
    var stageDOM = React.findDOMNode(this.refs.stage),
        stageWidth = stageDOM.scrollWidth,
        stageHeight = stageDO.scrollHeight,
        halfStageW = Math.ceil(stageWidth/2),
        halfStageH = Math.ceil(stageHeight/2);

    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);

    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    this.Constant.hPosRange.leftSecX[0] = 0 -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW -  halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageWidth -  halfImgW;
    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageHeight -  halfImgW;
    
    this.Constant.vPosRange.x[0] = stageWidth/2;
    this.Constant.vPosRange.x[1] = stageHeight -  halfImgW;
    this.Constant.vPosRange.topY[0] = - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH -  halfImgH * 3;



  },

  render() {    
    var controllerUnits = [],
        imgFigures = [];
   
    imageData.forEach(function(value, index){
        console.log(value);
        imgFigures.push(<ImgFigure data={value} ref = {'imgFigure'+index}/>);
    });

    return (
    	<section className = "stage" ref="stage">
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
