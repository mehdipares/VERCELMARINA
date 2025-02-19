
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


// Récupérer un utilisateur par ID
exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ error: 'user_not_found' });
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        return res.status(500).json({ error: error.message });
    }
};

//ajout user 
exports.add = async (req, res, next) => {
    try {
        // Hachage du mot de passe avant de stocker en base
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const temp = {
            name     : req.body.name,
            firstname: req.body.firstname,
            email    : req.body.email,
            password : hashedPassword // On stocke le mot de passe haché
        };

        let user = await User.create(temp);

        return res.status(201).json({ message: "user_created", user });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return res.status(500).json({ message: "internal_server_error", error: error.message });
    }
};


//modif 
exports.update = async (req, res, next) => {
    const id = req.params.id
    const temp = ({
        name    : req.body.name,
        firstname: req.body.firstname,
        email : req.body.email,
        password : req.body.password  
    });
    
    try {
        let user = await User.findOne({_id : id});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

//Ici c'est le callback qui servira a supprimer un user 

exports.delete = async (req, res, next) => {
    const id = req.params.id 

    try {
        await User.deleteOne({_id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }, '-__v -createdAt -updatedAt');
        if (!user) {
            return res.status(404).json({ message: 'user_not_found' });
        }

        console.log("Mot de passe fourni :", password);
        console.log("Mot de passe stocké en base :", user.password);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Résultat de bcrypt.compare :", passwordMatch);

        if (!passwordMatch) {
            return res.status(403).json({ message: 'wrong_credentials' });
        }

        // Suppression sécurisée du mot de passe avant de signer le token
        const { password: _, ...userWithoutPassword } = user.toObject();

        const token = jwt.sign(
            { user: userWithoutPassword }, 
            SECRET_KEY, 
            { expiresIn: '24h' } // Format plus lisible
        );

        res.header('Authorization', `Bearer ${token}`);
        return res.status(200).json({ message: 'authenticate_succeed', token });

    } catch (error) {
        console.error("Erreur serveur :", error);
        return res.status(500).json({ message: 'internal_server_error', error: error.message });
    }
};