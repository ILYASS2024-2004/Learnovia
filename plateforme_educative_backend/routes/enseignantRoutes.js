//ensegnatRoutes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');
const enseignantController = require('../controllers/enseignantController');

// ✅ Récupérer tous les cours de l'enseignant connecté
router.get('/mes-cours', auth, checkRole(['enseignant']), enseignantController.getMesCours);

// ✅ Récupérer tous les étudiants inscrits à ses cours
router.get('/etudiants-inscrits', auth, checkRole(['enseignant']), enseignantController.getMesEtudiantsInscrits);
router.get('/mes-cours-avec-chapitres', auth, checkRole(['enseignant']), enseignantController.getMesCoursAvecChapitres);

router.get('/tous-les-etudiants', auth, checkRole(['enseignant']), enseignantController.getTousLesEtudiants);


module.exports = router;
