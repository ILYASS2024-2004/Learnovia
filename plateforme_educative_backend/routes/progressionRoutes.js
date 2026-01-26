// 📁 routes/progressionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const progressionController = require('../controllers/progressionController');

// ✅ Routes progression protégées
router.post('/chapitre/:chapitre_id/terminer', auth, checkRole(['etudiant']), progressionController.terminerChapitre);
router.get('/cours', auth, checkRole(['etudiant']), progressionController.getProgressionGlobale);
router.get('/cours/:cours_id/chapitres', auth, checkRole(['etudiant']), progressionController.getChapitresAvecStatut);

module.exports = router;
