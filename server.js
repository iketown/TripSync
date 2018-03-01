const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

app.use(express.static('public'));

app.use(bodyParser.json())

// put routes here


// catch everything else 
app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


app.listen(process.env.PORT || 8080)

module.exports = { app }