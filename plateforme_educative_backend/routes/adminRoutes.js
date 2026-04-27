const express = require('express');
const router = express.Router();
const adminStatsController = require('../controllers/adminStatsController');
const auth = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware');

//  Route protégée pour admin uniquement
router.get('/stats', auth, checkRole(['admin']), adminStatsController.getStats);

module.exports = router;
