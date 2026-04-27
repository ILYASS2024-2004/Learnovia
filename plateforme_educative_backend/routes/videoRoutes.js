const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/chapitres/:chapitre_id/videos', videoController.upload, videoController.uploadVideo);
router.get('/chapitres/:chapitre_id/videos', videoController.getVideosByChapitre);
router.delete('/videos/:id', videoController.deleteVideo);

module.exports = router;
