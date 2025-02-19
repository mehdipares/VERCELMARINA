
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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

    const temp = ({
        name     : req.body.name,
        firstname: req.body.firstname,
        email    : req.body.email,
        password : req.body.password  
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
}


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
    console.log("Mot de passe fourni :", password);
    console.log("Mot de passe haché stocké :", user.password);


    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');
        if (user) {
            bcrypt.compare(password, user.password, function(err, response) {
                if(err) {
                    throw new Error(err);
                }
                if (response) {
                    delete user._doc.password;
                    
                    const expireIn = 24 * 60 * 60;
                    const token    = jwt.sign({
                        user: user
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    res.header('Authorization', 'bearer ' + token);
            
                    return res.status(200).json('authenticate_succeed');
                    }

                    return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(501).json(error);
    }
}