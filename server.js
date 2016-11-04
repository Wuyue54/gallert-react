'use strict';
require('babel-register');

const http =require('http');
const express = require('express');
const path = require('path');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.set('port', process.env.PORT || 3000);
app.use('/static', express.static(__dirname + '/public'));




app.get('/', (req,res)=>{
	res.sendFile(__dirname + '/index.html');
});


const server = require('http').createServer(app);
server.listen(app.get('port'),()=>{
	console.log("Express server listening on port " + app.get('port'));
});
