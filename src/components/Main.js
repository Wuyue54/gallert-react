require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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

function getRangeRandom(low, high){
    return Math.ceil( Math.random() * (high - low ) + low);
}

function getRotateRandom(){
    return Math.ceil(Math.random() * 60 - 30);
}

var ImgFigure = React.createClass({
    handleClick: function(e){
        if( this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
       
        e.stopPropagation();
        e.preventDefault();
    },

    render(){
        var styleObj ={};

        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }

        if(this.props.arrange.rotate){
            (['-moz-', '-ms-', '-webkit-', '']).forEach(function(value){
                styleObj['transform'] = 'rotate('+ this.props.arrange.rotate+'deg)';
            }.bind(this))
        }

        if (this.props.arrange.isCenter) {
          styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
            imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : ' ';
        return (
            <figure className ={imgFigureClassName} style = {styleObj} onClick = {this.handleClick} >
                <img src = {this.props.data.URL}
                     alt = {this.props.data.title}                    
                />
                <figcaption>
                    <h2 className = "img-title">{this.props.data.title}</h2>
                    <div className = "img-back" onClick = {this.handleClick}>
                        <p>
                            {this.props.data.description}
                        </p>
                    </div>                            
                </figcaption>
            </figure>
        )
    }
    
})

var AppComponent = React.createClass({
  Constant:{
    centerPos: {
        left:0,
        right: 0
    },
    hPosRange: {
        leftSecX: [0,0],
        rightSecX: [0,0],
        y: [0,0]
    },
    vPosRange: {
        x: [0,0],
        topY: [0,0]
    }
  },

  inverse: function(index){
    return function(){
        var imagesArrangeArr = this.state.imagesArrangeArr;

        imagesArrangeArr[index].isInverse = ! imagesArrangeArr[index].isInverse;
        this.setState({
            imagesArrangeArr: imagesArrangeArr
        });

    }.bind(this);
  },

  reArrange : function(centerIndex){
    var imagesArrangeArr = this.state.imagesArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeX = vPosRange.x,
        vPosRangeTopY = vPosRange.topY,

        imagesArrangeTopArr = [],
        topImageNum = Math.ceil(Math.random() * 2),
        topImageSpliceIndex = 0,

        imagesArraneCenter = imagesArrangeArr.splice(centerIndex,1);
    
    imagesArraneCenter[0] = {
        pos: centerPos,
        rotate: 0,
        isCenter: true
    };


    topImageSpliceIndex = Math.ceil( Math.random() * (imagesArrangeArr.length - topImageNum));
    imagesArrangeTopArr = imagesArrangeArr.splice(topImageSpliceIndex, topImageNum);

    imagesArrangeTopArr.forEach(function(value, index){
        imagesArrangeTopArr[index] = {
            pos:{
                top: getRangeRandom(vPosRangeTopY[1], vPosRangeTopY[0]),
                left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: getRotateRandom(),
            isCenter: false
        }
    });
    
    for( var i = 0 , j = imagesArrangeArr.length, k = j/2 ; i<j; i++){
        var hPosRangeLORX = null ;
        if( i < k ){
            hPosRangeLORX = hPosRangeLeftSecX;
        }else{
            hPosRangeLORX = hPosRangeRightSecX;
        }

        imagesArrangeArr[i] = {
            pos:{
                top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate: getRotateRandom(),
            isCenter: false
        }
    }    

    if(imagesArrangeTopArr && imagesArrangeTopArr[0]){
        imagesArrangeArr.splice(topImageSpliceIndex, 0 , imagesArrangeTopArr[0]);
    }

    imagesArrangeArr.splice(centerIndex, 0 , imagesArraneCenter[0]);

    this.setState({
        imagesArrangeArr: imagesArrangeArr
    })

  },

  center: function(index){
    return function(){
        this.reArrange(index);
    }.bind(this);
  },

  getInitialState: function(){
    return {
        imagesArrangeArr:[
            {
                pos:{
                    left: '0',
                    top: '0'
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
        ]
    }
  },

  componentDidMount: function(){
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageWidth = stageDOM.scrollWidth,
        stageHeight = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageWidth/2),
        halfStageH = Math.ceil(stageHeight/2);

    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);

    // console.log(this.Constant);
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW -  halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageWidth -  halfImgW;
    this.Constant.hPosRange.y[0] = - halfImgH;
    this.Constant.hPosRange.y[1] = stageHeight -  halfImgH;
    
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH -  halfImgH * 3 ;

    this.reArrange(0);

  },
  
  render: function() {    
    var controllerUnits = [],
        imgFigures = [];
   
    imageData.forEach(function(value, index){
        if(!this.state.imagesArrangeArr[index]){
            this.state.imagesArrangeArr[index] = {
                pos:{
                    left: 0 ,
                    top: 0
                },
                rotate: 0,
                isInverse: false,
                isCenter: false
            }
        }
        imgFigures.push(<ImgFigure data={value} ref = {'imgFigure'+index} 
            arrange = {this.state.imagesArrangeArr[index]}
            inverse = {this.inverse(index)}
            center = {this.center(index)}/>
            );
    }.bind(this));

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
})

AppComponent.defaultProps = {
};

export default AppComponent;
