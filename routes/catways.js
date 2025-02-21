const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

//attention, pour les catways l'id correspond au numéro du catway


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

//ROUTE POUR AFFICHER LA VUE

router.get('/view', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
