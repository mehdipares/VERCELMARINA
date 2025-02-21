const express = require("express");
const path = require('path');
const dotenv = require("dotenv").config();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');
const private = require("./middlewares/private");
const router = express.Router();

//routes users, catways, ect
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationsRouter = require ('./routes/reservations');
const port = process.env.PORT || 3000;

const app = express();
mongodb.initClientDbConnection();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); // Dossier des vues

// Route par défaut qui redirige vers /login
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/tableaudebord', (req, res) => {
  res.render('tableaudebord');
});

app.use(cors({
  exposedHeaders: ['Authorization'], 
  origin: "*"
}));



app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());



app.use("/", indexRouter); 
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);
app.use('/reservations', reservationsRouter);
/*
app.get("/", test.login);
*/
app.listen(port, () => {
  `Server started on port ${port}`;
});


app.use(function(req, res, next) {
  res.status(404).json({name:'API', version:'1.0', status: 404, message: 'not_found'});
});

module.exports = app;