const express = require('express');
const session = require('express-session');
const passport = require('passport');
const {localStrategy, jwtStrategy} = require('./auth')
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const path = require('path')

const legsRouter = require('./routes/legs.router')
const usersRouter = require('./routes/users.router')
const tripsRouter = require('./routes/trips.router')
const authRouter = require('./routes/auth.router')
const homeRouter = require('./routes/home.router')
const adminRouter = require('./routes/admin.router')

const expressValidator = require('express-validator')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
const {DATABASE_URL, PORT} = require('./config')
const flash = require('connect-flash')


require('dotenv').config({ path: 'variables.env' });
// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(expressValidator())
app.use(cookieParser())

app.use( passport.initialize() )
// app.use(passport.session())
// app.use(flash());

app.use((req, res, next)=>{
	res.locals.h = helpers;
	// res.locals.flashes = req.flash();
	res.locals.currentPath = req.path;
  // res.locals.user = req.user
	next();
})

passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {
  session: false,
})

//
app.use('/', homeRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/admin/trips', jwtAuth, tripsRouter)
app.use('/admin/users', jwtAuth, usersRouter)
app.use('/admin/legs',  legsRouter)

let server;

function runServer(dbURL, port = PORT){
  return new Promise((resolve,reject)=>{
    mongoose.connect(dbURL, err=> {
      if(err){
        return reject(err);
      }
      server = app.listen(port, ()=>{
        console.log(`app listening on port ${port} 😇`);
        resolve()
      })
    })
  })
}
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// this block runs if you start with "node server.js"
if(require.main === module){
  runServer(DATABASE_URL).catch(err=> console.error(err))
}

module.exports = { app, runServer, closeServer }

