const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// connects to the Helpers
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const controllers = require('./controllers');
const sequelize = require('./config/connection');
// Adds the sequalize store functions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Creates the cookie settings
const sess = {
  // Makes a hash response
  secret: 'Santa is coming to town',
  // Makes initial cookie
  cookie: {},
  resave: false,
  // Saves the cookie
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// Activates the cookie 
app.use(session(sess));

// Loads the stylesheet
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activates the routes
app.use(require('./controllers'));

// Set up Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});