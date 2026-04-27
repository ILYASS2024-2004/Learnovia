// 📁 routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

// Ajouter une notification à un étudiant spécifique ou globale (admin seulement)
router.post('/', auth, checkRole(['admin', 'enseignant']), notificationController.ajouterNotification);

//  Obtenir les notifications visibles par un étudiant connecté
router.get('/', auth, checkRole(['etudiant']), notificationController.getNotifications);


//  Marquer toutes les notifications comme lues (étudiant)
router.put('/toutes/lire', auth, checkRole(['etudiant']), notificationController.marquerToutesCommeLues);


//  Supprimer une notification par son ID (admin seulement)
router.delete('/:id', auth, checkRole(['etudiant']), notificationController.supprimerNotification);

module.exports = router;