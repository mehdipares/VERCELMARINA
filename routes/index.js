var express = require('express');
var router = express.Router();

const userRoute = require('./users.js');


router.get ('/', async (req, res) => {
    res.status(200).json ({
        name    : process.env.APP_NAME,
        version : '1.0',
        status  : 200,
        message : 'Bienvenue sur L\'API !'
    });
});

router.use('/users', userRoute);

module.exports = router;