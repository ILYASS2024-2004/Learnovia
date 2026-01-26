// 📁 controllers/examensController.js
const db = require('../config/db');

// ✅ Ajouter une note d'examen
exports.ajouterExamen = async (req, res) => {
  const { etudiant_id, cours_id, note } = req.body;
  const enseignant_id = req.user.id;

  try {
  // Nouveau contrôle (plus souple)
const [cours] = await db.query('SELECT * FROM cours WHERE id = ? AND enseignant_id = ?', [cours_id, enseignant_id]);
if (cours.length === 0) return res.status(403).json({ message: "Vous ne pouvez saisir une note que pour vos propres cours." });
// On autorise même si l'étudiant n’est pas inscrit


    await db.query('INSERT INTO examens (etudiant_id, cours_id, note) VALUES (?, ?, ?)', [etudiant_id, cours_id, note]);
    res.status(201).json({ message: "Note ajoutée." });
  } catch (error) {
      // 🛑 Gestion spécifique des erreurs SQL
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: "Cet étudiant a déjà une note pour ce cours.",
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout." });
  }
};

// ✅ Récupérer toutes les notes pour les cours de l'enseignant
exports.getExamensByEnseignant = async (req, res) => {
  const enseignant_id = req.user.id;

  try {
    const [examens] = await db.query(`
      SELECT e.id, e.note,e.validation, e.date_examen,et.id AS ide, et.nom AS etudiant, c.titre AS cours
      FROM examens e
      JOIN cours c ON e.cours_id = c.id
      JOIN etudiants et ON e.etudiant_id = et.id
      WHERE c.enseignant_id = ?
    `, [enseignant_id]);

    res.json(examens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur de récupération." });
  }
};

// ✅ Modifier une note
exports.modifierExamen = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const enseignant_id = req.user.id;

  try {
    const [verif] = await db.query(`
      SELECT e.* FROM examens e
      JOIN cours c ON e.cours_id = c.id
      WHERE e.id = ? AND c.enseignant_id = ?
    `, [id, enseignant_id]);

    if (verif.length === 0) return res.status(403).json({ message: "Non autorisé." });

    await db.query('UPDATE examens SET note = ? WHERE id = ?', [note, id]);
    res.json({ message: "Note mise à jour." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur modification." });
  }
};

// ✅ Supprimer une note
exports.supprimerExamen = async (req, res) => {
  const { id } = req.params;
  const enseignant_id = req.user.id;

  try {
    const [verif] = await db.query(`
      SELECT e.* FROM examens e
      JOIN cours c ON e.cours_id = c.id
      WHERE e.id = ? AND c.enseignant_id = ?
    `, [id, enseignant_id]);

    if (verif.length === 0) return res.status(403).json({ message: "Non autorisé." });

    await db.query('DELETE FROM examens WHERE id = ?', [id]);
    res.json({ message: "Note supprimée." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur suppression." });
  }
};
// ✅ Étudiant - voir ses propres examens
exports.getExamensByEtudiant = async (req, res) => {
  const { etudiantId } = req.params;
  const userId = req.user.id;

  try {
    // Sécurité : Un étudiant ne peut voir que ses propres examens
    if (req.user.role !== 'etudiant' || Number(userId) !== Number(etudiantId)) {
      return res.status(403).json({ message: "Accès interdit." });
    }

    const [examens] = await db.query(`
      SELECT e.id, e.note, e.date_examen,e.validation, c.titre AS cours
      FROM examens e
      JOIN cours c ON e.cours_id = c.id
      WHERE e.etudiant_id = ?
    `, [etudiantId]);

    res.json(examens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération." });
  }
};
