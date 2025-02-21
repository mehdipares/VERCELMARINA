const express = require('express');

const Catway = require('../models/catway');

const getAll = async (req, res) => {
    try {
        const catways = await Catway.find().sort({ catwayNumber: 1 }); // Tri par numéro croissant
        res.json(catways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });
        res.json(catway);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const add = async (req, res) => {
    const catway = new Catway({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });
    try {
        const newCatway = await catway.save();
        res.status(201).json(newCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const update = async (req, res) => {
    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState: req.body.catwayState },
            { new: true }
        );
        if (!updatedCatway) return res.status(404).json({ message: 'Catway non trouvé' });
        res.json(updatedCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!deletedCatway) return res.status(404).json({ message: 'Catway non trouvé' });
        res.json({ message: 'Catway supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getById, add, update, remove };