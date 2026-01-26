// 📁 routes/examensRoutes.js
const express = require('express');
const router = express.Router();
const examensController = require('../controllers/examensController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// 📌 👨‍🏫 Routes enseignant : CRUD sur les examens
router.post('/', auth, checkRole(['enseignant']), examensController.ajouterExamen);
router.get('/', auth, checkRole(['enseignant']), examensController.getExamensByEnseignant);
router.put('/:id', auth, checkRole(['enseignant']), examensController.modifierExamen);
router.delete('/:id', auth, checkRole(['enseignant']), examensController.supprimerExamen);

// 📌 👨‍🎓 Étudiant : consulter ses propres examens
router.get('/etudiant/:etudiantId', auth, checkRole(['etudiant']), examensController.getExamensByEtudiant);

module.exports = router;
