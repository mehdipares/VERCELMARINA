const jwt    = require('jsonwebtoken');
const cookieparser = require('cookie-parser');

const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    console.log("🔍 Middleware checkJWT appelé !");

    let token = req.cookies.token;
    console.log("🔑 Token reçu :", token);

    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        console.log("✂️ Token après suppression de 'Bearer ' :", token);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("🚨 Erreur JWT :", err.message);
                return res.redirect('../views/login.ejs'); // Redirection vers login si token invalide
            } else {
                console.log("✅ Token décodé :", decoded);
                req.decoded = decoded; // Stocker les infos du token
                next();
            }
        });
    } else {
        console.log("🚫 Aucun token trouvé, redirection vers login");
        return res.redirect('/login');
    }
};
