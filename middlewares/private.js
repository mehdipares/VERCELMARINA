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
                return res.status(401).json('token_not_valid');
            } else {
                console.log("✅ Token décodé :", decoded);
                
                req.decoded = decoded; // Stocker les infos du token

                // Regénération du token (optionnel)
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign({ user: decoded.user }, SECRET_KEY, { expiresIn: expiresIn });

                console.log("🔄 Nouveau token généré :", newToken);
                res.header('Authorization', 'Bearer ' + newToken);

                next(); // Passer à la suite
            }
        });
    } else {
        console.log("❌ Aucun token fourni !");
        return res.status(401).json('token_required');
    }
};
