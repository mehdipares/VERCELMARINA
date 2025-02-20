const Reservation = require('../models/reservation');

const getAll = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const add = async (req, res) => {
    const reservation = new Reservation({
        userId: req.body.userId,
        catwayId: req.body.catwayId,
        date: req.body.date
    });
    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { date: req.body.date },
            { new: true }
        );
        if (!updatedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json({ message: 'Réservation supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getById, add, update, remove };
