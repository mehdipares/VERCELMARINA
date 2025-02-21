const express = require ('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

//la route pour lire les infos d'un utilisateur
router.get('/:id', private.checkJWT, service.getById);
//la route pour ajouter un utilisateur
router.put('/add', service.add);
//la route pour modifier un utilisateur
router.patch('/:id', private.checkJWT, service.update);
//la route pour supprimer un utilisateur
router.delete('/:id', private.checkJWT, service.delete);

//route authentification
router.post ('/authenticate', service.authenticate);
// Route pour récupérer les infos utilisateur sans vérifier le token
router.get('/info/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("name email");
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.json(user);
    } catch (error) {
        console.error("Erreur /users/info/:id:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;