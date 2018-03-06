const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const legsRouter = require('./routes/legs.router')
const locationsRouter = require('./routes/locations.router')
const usersRouter = require('./routes/users.router')
const groupsRouter = require('./routes/groups.router')
const tripsRouter = require('./routes/trips.router')

const {DATABASE_URL} = require('./config')


app.use(express.static('public'));
app.use(bodyParser.json())

app.use('/admin/legs', legsRouter)
app.use('/admin/locations', locationsRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/groups', groupsRouter)
app.use('/admin/trips', tripsRouter)


// admin router
// traveler router
// leg router
// location router


// catch everything else 
app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})
// connect the db and start the server
mongoose.connect(DATABASE_URL, () => {
  app.listen(process.env.PORT || 8080, () => console.log('listening'))
})



module.exports = { app }

