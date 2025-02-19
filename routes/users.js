const express = require ('express');
const router = express.Router();

const service = require('../services/users');
//la route pour lire les infos d'un utilisateur
router.get('/:id', service.getById);
//la route pour ajouter un utilisateur
router.put('add', service.add);
//la route pour modifier un utilisateur
router.patch('/:id', service.update);
//la route pour supprimer un utilisateur
router.delete('/:id', service.delete);

module.exports = router;