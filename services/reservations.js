const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations');

// GET /reservations - Lister toutes les réservations
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /catways/:id/reservations - Lister toutes les réservations d'un catway
router.get('/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /catways/:id/reservations/:idReservation - Récupérer une réservation spécifique
router.get('/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /catways/:id/reservations - Créer une réservation
router.post('/:id/reservations', async (req, res) => {
    const reservation = new Reservation({
        catwayNumber: req.params.id,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /catways/:id/reservations/:idReservation - Modifier une réservation
router.put('/:id/reservations/:idReservation', async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.idReservation,
            req.body,
            { new: true }
        );
        if (!updatedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /catways/:id/reservations/:idReservation - Supprimer une réservation
router.delete('/:id/reservations/:idReservation', async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.idReservation);
        if (!deletedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json({ message: 'Réservation supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
