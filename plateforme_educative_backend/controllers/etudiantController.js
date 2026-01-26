// controllers/etudiantController.js
const db = require('../config/db');

exports.getEnseignantsDesCoursInscrits = async (req, res) => {
  const etudiantId = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT DISTINCT e.id, e.nom, e.email
      FROM inscriptions i
      JOIN cours c ON i.cours_id = c.id
      JOIN enseignants e ON c.enseignant_id = e.id
      WHERE i.etudiant_id = ?
    `, [etudiantId]);

    res.json(rows);
  } catch (error) {
    console.error("Erreur getEnseignantsDesCoursInscrits:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
