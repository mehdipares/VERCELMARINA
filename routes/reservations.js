const express = require('express');
const router = express.Router();

const service = require('../services/reservations');
const private = require('../middlewares/private');

// Lister toutes les réservations
router.get('/', private.checkJWT, service.getAll);
// Récupérer une réservation spécifique
router.get('/:id', private.checkJWT, service.getById);
// Ajouter une réservation
router.post('/', private.checkJWT, service.add);
// Modifier une réservation
router.patch('/:id', private.checkJWT, service.update);
// Supprimer une réservation
router.delete('/:id', private.checkJWT, service.remove);

module.exports = router;
