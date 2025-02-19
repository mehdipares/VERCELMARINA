
const User = require('../models/user');

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