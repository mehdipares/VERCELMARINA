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
const User = require('./models/user')


//routes users, catways, ect
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationsRouter = require ('./routes/reservations');
const port = process.env.PORT || 3000;

const app = express();


mongodb.initClientDbConnection();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); // Dossier des vues
// Middleware pour servir des fichiers statiques (CSS, images, etc.)
app.use(
  '/static',
  express.static(path.join(__dirname, 'public'), {
    fallthrough: false, // Génère une erreur si le fichier n'est pas trouvé
  })
);

// Route par défaut qui redirige vers /login
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/cats', (req, res) => {
  res.render('catways');
});



app.use(cookieparser());
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.get('/tableaudebord', private.checkJWT, async (req, res) => {
  try {
      // Récupérer l'ID utilisateur depuis le token (déjà vérifié par `private.checkJWT`)
      const userId = req.decoded.user._id; // Vérifie bien que `_id` est la bonne clé
      console.log("🆔 ID utilisateur récupéré :", userId);

      // Récupérer l'utilisateur en base de données
      const user = await User.findById(userId);
      if (!user) {
          console.log("❌ Utilisateur non trouvé !");
          return res.redirect('/login');
      }

      // Rendre la page du tableau de bord avec les infos utilisateur
      res.render('tableaudebord', { user });
  } catch (error) {
      console.error("🚨 Erreur récupération utilisateur:", error.message);
      res.redirect('/login');
  }
});


app.use(cors({
exposedHeaders: ['Authorization'], 
origin: "*"
}));







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