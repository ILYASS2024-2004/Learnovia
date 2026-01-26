// 📁 controllers/notificationController.js
const pool = require('../config/db');

// ✅ Ajouter une notification (admin)
exports.ajouterNotification = async (req, res) => {
  const { etudiant_id, titre, message } = req.body;
  try {
    await pool.execute(
      `INSERT INTO notifications (etudiant_id, titre, message) VALUES (?, ?, ?)`,
      [etudiant_id || null, titre, message]
    );
    res.status(201).json({ message: 'Notification envoyée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Voir les notifications (étudiant)
exports.getNotifications = async (req, res) => {
  const etudiant_id = req.user.id;
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM notifications WHERE etudiant_id = ? OR etudiant_id IS NULL ORDER BY date DESC`,
      [etudiant_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
