const Reservation = require('../models/reservation');
//function pour lister l'ensemble des résas
const getAll = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//function pour avoir une résas avec son

const getById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//function pour ajouter un résevartion 
const add = async (req, res) => {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const reservation = new Reservation({ catwayNumber, clientName, boatName, startDate, endDate });

    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
//function pour modif une résas
const update = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,  // Permet de modifier n'importe quel champ envoyé
            { new: true, runValidators: true }  // Active la validation Mongoose
        );
        if (!updatedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//function pour supp un résas
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
