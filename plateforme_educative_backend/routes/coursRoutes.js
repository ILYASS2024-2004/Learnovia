// File: plateforme_educative_backend/routes/coursRoutes.js
// 📁 routes/coursRoutes.js
const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

router.post('/', auth, checkRole(['enseignant']), coursController.createCours);
router.put('/:id', auth, checkRole(['enseignant']), coursController.updateCours);
router.delete('/:id', auth, checkRole(['enseignant']), coursController.deleteCours);
router.get('/', coursController.getCours); // accessible à tous
// /api/cours/:cours_id/etudiants
router.get('/:cours_id/etudiants', auth, checkRole(['enseignant']), coursController.getEtudiantsInscrits);

router.get('/disponibles', auth, checkRole(['etudiant']), coursController.getCoursDisponiblesPourEtudiant);

router.get('/achetes', auth, checkRole(['etudiant']), coursController.getCoursAchetesParEtudiant);


module.exports = router;