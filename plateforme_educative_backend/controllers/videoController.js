const pool = require('../config/db');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage (on stocke temporairement la vidéo en mémoire)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//  Upload vidéo pour un chapitre
//  Upload vidéo
exports.uploadVideo = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;
  const { description } = req.body;

  if (!req.file) return res.status(400).json({ message: 'Aucun fichier envoyé' });

  try {
    // Upload dans Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: `chapitres/${chapitre_id}` },
      async (error, result) => {
        if (error) return res.status(500).json({ message: 'Erreur Cloudinary', error });

        // 🔹 Stocker l’URL + le public_id dans la DB
        const [insert] = await pool.execute(
          'INSERT INTO videos (chapitre_id, description, url, public_id) VALUES (?, ?, ?, ?)',
          [chapitre_id, description || null, result.secure_url, result.public_id]
        );

        res.status(201).json({ 
          message: 'Vidéo ajoutée', 
          video: { 
            id: insert.insertId, 
            url: result.secure_url, 
            description, 
            public_id: result.public_id 
          } 
        });
      }
    );

    // Convertir buffer en stream pour Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);
    bufferStream.pipe(stream);

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

//  Récupérer les vidéos d’un chapitre
exports.getVideosByChapitre = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;

  try {
    const [videos] = await pool.execute('SELECT * FROM videos WHERE chapitre_id = ?', [chapitre_id]);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
//  Supprimer une vidéo
exports.deleteVideo = async (req, res) => {
  const video_id = req.params.id;

  try {
    // Récupérer public_id
    const [rows] = await pool.execute('SELECT public_id FROM videos WHERE id = ?', [video_id]);
    if (!rows.length) return res.status(404).json({ message: 'Vidéo non trouvée' });

    const public_id = rows[0].public_id;

    // 🔹 Supprimer de Cloudinary
    await cloudinary.uploader.destroy(public_id, { resource_type: 'video' });

    // 🔹 Supprimer de la BDD
    await pool.execute('DELETE FROM videos WHERE id = ?', [video_id]);

    res.json({ message: 'Vidéo supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


module.exports.upload = upload.single('video'); // middleware multer
