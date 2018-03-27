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
const locationsRouter = require('./routes/locations.router')
const usersRouter = require('./routes/users.router')
const groupsRouter = require('./routes/groups.router')
const tripsRouter = require('./routes/trips.router')
const eventsRouter = require('./routes/events.router')
const authRouter = require('./routes/auth.router')
const homeRouter = require('./routes/home.router')
const adminRouter = require('./routes/admin.router')

const expressValidator = require('express-validator')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
const {DATABASE_URL} = require('./config')
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
app.use(session({
  secret: 'secret thing',
  key: 'key key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use( passport.initialize() )
// app.use(passport.session())
app.use(flash());

app.use((req, res, next)=>{
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.currentPath = req.path;
  // res.locals.user = req.user
	next();
})

passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/auth/login'
})

//
app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/admin', jwtAuth,  adminRouter)
app.use('/admin/legs',  legsRouter)
app.use('/admin/locations',jwtAuth, locationsRouter)
app.use('/admin/travelers', jwtAuth, usersRouter)
app.use('/admin/users', jwtAuth, usersRouter)
app.use('/admin/trips', jwtAuth, tripsRouter)
app.use('/admin/events',jwtAuth, eventsRouter)
app.use('/home', homeRouter)

// catch everything else 
// app.get('*', (req, res)=>{
// 	res.sendFile(path.join(__dirname, './public', 'index.html'))
// })

app.use(errorHandlers.notFound)
app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors)
// connect the db and start the server
mongoose.connect(DATABASE_URL, () => {
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
})



module.exports = { app }

