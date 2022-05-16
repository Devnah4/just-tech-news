const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const controllers = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Loads the stylesheet
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activates the routes
app.use(controllers);

// Set up Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});