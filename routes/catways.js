const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

// Lister tous les catways
router.get('/', private.checkJWT, service.getAll);
// Récupérer un catway spécifique
router.get('/:id', private.checkJWT, service.getById);
// Ajouter un catway
router.post('/', private.checkJWT, service.add);
// Modifier un catway
router.put('/:id', private.checkJWT, service.update);
// Supprimer un catway
router.delete('/:id', private.checkJWT, service.remove);

module.exports = router;
