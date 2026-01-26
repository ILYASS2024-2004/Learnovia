const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const etudiantController = require('../controllers/etudiantController');

// ✅ Récupérer les enseignants des cours achetés
router.get('/enseignants', auth, checkRole(['etudiant']), etudiantController.getEnseignantsDesCoursInscrits);

module.exports = router;
