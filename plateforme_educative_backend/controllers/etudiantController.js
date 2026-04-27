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
exports.getCoursByEtudiant = async (req, res) => {
  const etudiant_id = req.params.id;

  try {
    const [rows] = await db.execute(`
      SELECT c.id, c.titre, c.description, c.img_url, ens.nom AS enseignant, ens.email AS email_enseignant
      FROM cours c
      JOIN enseignants ens ON c.enseignant_id = ens.id
      JOIN inscriptions i ON i.cours_id = c.id
      WHERE i.etudiant_id = ? AND i.statut_paiement = 'payé'
    `, [etudiant_id]);

    res.json(rows);
  } catch (err) {
    console.error("Erreur récupération cours étudiant :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
