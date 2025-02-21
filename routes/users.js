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

module.exports = router;