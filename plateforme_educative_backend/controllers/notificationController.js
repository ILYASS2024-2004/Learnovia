// 📁 controllers/notificationController.js
const pool = require('../config/db');

// ✅ Ajouter une notification (admin)
// exports.ajouterNotification = async (req, res) => {
//   const { etudiant_id, titre, message } = req.body;
//   try {
//     await pool.execute(
//       `INSERT INTO notifications (etudiant_id, titre, message) VALUES (?, ?, ?)`,
//       [etudiant_id || null, titre, message]
//     );
//     res.status(201).json({ message: 'Notification envoyée' });
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur', error: err.message });
//   }
// };
exports.ajouterNotification = async (req, res) => {
  const { etudiant_id, titre, message } = req.body;
  try {
    if (etudiant_id) {
      // 🔹 Notification pour un seul étudiant
      await pool.execute(
        `INSERT INTO notifications (etudiant_id, titre, message) VALUES (?, ?, ?)`,
        [etudiant_id, titre, message]
      );
    } else {
      // 🔹 Notification pour TOUS les étudiants
      const [etudiants] = await pool.execute(`SELECT id FROM etudiants`);
      const values = etudiants.map(e => [e.id, titre, message]);
      await pool.query(
        `INSERT INTO notifications (etudiant_id, titre, message) VALUES ?`,
        [values]
      );
    }

    res.status(201).json({ message: 'Notification envoyée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


// // ✅ Voir les notifications (étudiant)
// exports.getNotifications = async (req, res) => {
//   const etudiant_id = req.user.id;
//   try {
//     const [rows] = await pool.execute(
//       `SELECT * FROM notifications WHERE etudiant_id = ? OR etudiant_id IS NULL ORDER BY date DESC`,
//       [etudiant_id]
//     );
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur serveur', error: err.message });
//   }
// };
// ✅ Voir les notifications (étudiant)
exports.getNotifications = async (req, res) => {
  const etudiant_id = req.user.id;
  try {
    // 1️⃣ Récupérer toutes les notifications de l'étudiant
    const [notifications] = await pool.execute(
      `SELECT id, titre, message, est_lu, date_creation 
       FROM notifications 
       WHERE etudiant_id = ? 
       ORDER BY date_creation DESC`,
      [etudiant_id]
    );

    // 2️⃣ Compter celles qui ne sont pas encore lues
    const [nonLues] = await pool.execute(
      `SELECT COUNT(*) AS total_non_lues 
       FROM notifications 
       WHERE etudiant_id = ? AND est_lu = 0`,
      [etudiant_id]
    );

    // 3️⃣ Réponse combinée
    res.json({
      notifications,
      total_non_lues: nonLues[0].total_non_lues,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
// ✅ Marquer toutes les notifications comme lues
exports.marquerToutesCommeLues = async (req, res) => {
  const etudiant_id = req.user.id;
  try {
    await pool.execute(
      `UPDATE notifications 
       SET est_lu = TRUE 
       WHERE (etudiant_id = ? OR etudiant_id IS NULL) 
         AND est_lu = FALSE`,
      [etudiant_id]
    );

    res.json({ message: 'Toutes les notifications ont été marquées comme lues.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


// 🔹 Supprimer une notification par son ID
exports.supprimerNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute(
      `DELETE FROM notifications WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification non trouvée.' });
    }

    res.json({ message: 'Notification supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

