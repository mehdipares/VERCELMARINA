
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
    catwayNumber: { type: Number, required: true },
    clientName: { type: String, required: true },
    boatName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);