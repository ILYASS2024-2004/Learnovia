
//  controllers/chapitreController.js
const pool = require('../config/db');

exports.createChapitre = async (req, res) => {
  const { cours_id, titre, description, img_url, contenu, ordre } = req.body;
  try {
    await pool.execute(
      `INSERT INTO chapitres (cours_id, titre, description, img_url, contenu, ordre) VALUES (?, ?, ?, ?, ?, ?)`,
      [cours_id, titre, description, img_url, contenu, ordre]
    );
    res.status(201).json({ message: 'Chapitre créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

exports.getChapitres = async (req, res) => {
  const { cours_id } = req.params;
  try {
    const [rows] = await pool.execute(`SELECT * FROM chapitres WHERE cours_id = ? ORDER BY ordre ASC`, [cours_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};



exports.deleteChapitre = async (req, res) => {
  const chapitre_id = req.params.id;
  try {
    await pool.execute('DELETE FROM chapitres WHERE id = ?', [chapitre_id]);
    res.json({ message: 'Chapitre supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
  }
};

exports.getChapitreAvecCondition = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;

  try {
    const [rows] = await pool.execute(
      'SELECT id, cours_id, titre, description, img_url, contenu, ordre FROM chapitres WHERE id = ?',
      [chapitre_id]
    );

    if (!rows.length) return res.status(404).json({ message: 'Chapitre non trouvé' });

    const chapitre = rows[0];

    if (!req.paiementEffectue) {
      delete chapitre.contenu;
    }

    res.json(chapitre);
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};