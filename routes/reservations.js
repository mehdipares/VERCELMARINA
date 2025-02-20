const express = require('express');
const router = express.Router();
const service = require('../services/reservations');
const private = require('../middlewares/private');

// Lister toutes les réservations
router.get('/reservations', private.checkJWT, service.getAll);

// Lister toutes les réservations d'un catway
router.get('/:id/reservations', private.checkJWT, service.getAllByCatway);

// Récupérer une réservation spécifique
router.get('/:id/reservations/:idReservation', private.checkJWT, service.getById);

// Ajouter une réservation
router.post('/:id/reservations', private.checkJWT, service.add);

// Modifier une réservation
router.put('/:id/reservations/:idReservation', private.checkJWT, service.update);

// Supprimer une réservation
router.delete('/:id/reservations/:idReservation', private.checkJWT, service.delete);

module.exports = router;
