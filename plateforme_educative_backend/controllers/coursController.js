// controllers/coursController.js
const pool = require('../config/db');

exports.createCours = async (req, res) => {
  const { titre, description, img_url, prix } = req.body;
  const enseignant_id = req.user.id;
  try {
    await pool.execute(
      `INSERT INTO cours (enseignant_id, titre, description, img_url, prix) VALUES (?, ?, ?, ?, ?)`,
      [enseignant_id, titre, description, img_url, prix]
    );
    res.status(201).json({ message: 'Cours créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

exports.updateCours = async (req, res) => {
  const { titre, description, img_url, prix } = req.body;
  const idCours = req.params.id;
  const enseignant_id = req.user.id;
  try {
    await pool.execute(
      `UPDATE cours SET titre = ?, description = ?, img_url = ?, prix = ? WHERE id = ? AND enseignant_id = ?`,
      [titre, description, img_url, prix, idCours, enseignant_id]
    );
    res.json({ message: 'Cours mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

exports.deleteCours = async (req, res) => {
  try {
    await pool.execute(`DELETE FROM cours WHERE id = ? AND enseignant_id = ?`, [req.params.id, req.user.id]);
    res.json({ message: 'Cours supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

exports.getCours = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM cours`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getEtudiantsInscrits = async (req, res) => {
  const cours_id = req.params.cours_id;
  const enseignant_id = req.user.id;

  try {
    // Vérifier que ce cours appartient à l'enseignant connecté
    const [[cours]] = await pool.execute(`SELECT * FROM cours WHERE id = ? AND enseignant_id = ?`, [cours_id, enseignant_id]);
    if (!cours) return res.status(403).json({ message: 'Ce cours ne vous appartient pas' });

    const [etudiants] = await pool.execute(`
      SELECT e.id, e.nom, e.email, i.date_inscription
      FROM inscriptions i
      JOIN etudiants e ON e.id = i.etudiant_id
      WHERE i.cours_id = ? AND i.statut_paiement = 'payé'
    `, [cours_id]);

    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getCoursDisponiblesPourEtudiant = async (req, res) => {
  const etudiant_id = req.user.id;

  try {
    // 1. Récupérer les cours NON achetés par l'étudiant
    const [cours] = await pool.execute(`
      SELECT c.id, c.titre, c.description, c.prix, c.img_url,c.date_de_creation, ens.nom AS enseignant
      FROM cours c
      JOIN enseignants ens ON c.enseignant_id = ens.id
      WHERE c.id NOT IN (
        SELECT cours_id FROM inscriptions WHERE etudiant_id = ? AND statut_paiement = 'payé'
      )
    `, [etudiant_id]);

    const coursIds = cours.map(c => c.id);
    if (coursIds.length === 0) return res.json([]); // Aucun cours dispo

    // 2. Récupérer les chapitres SANS contenu
    const [chapitres] = await pool.query(`
      SELECT id, titre, description, img_url, ordre, cours_id
      FROM chapitres
      WHERE cours_id IN (?)
      ORDER BY ordre ASC
    `, [coursIds]);

    // 3. Associer chapitres → cours
    const coursAvecChapitres = cours.map(c => ({
      ...c,
      chapitres: chapitres
        .filter(ch => ch.cours_id === c.id)
        .map(({ cours_id, ...ch }) => ch) // Supprimer cours_id
    }));

    res.json(coursAvecChapitres);
  } catch (err) {
    console.error("Erreur récupération cours disponibles", err);
    res.status(500).json({ message: 'Erreur récupération cours disponibles', error: err.message });
  }
};


//  Étudiant - voir ses cours achetés
// exports.getCoursAchetesParEtudiant = async (req, res) => {
//   const etudiant_id = req.user.id;

//   try {
//     const [rows] = await pool.execute(`
//       SELECT c.id, c.titre, c.description, c.prix, c.img_url, ens.nom AS enseignant
//       FROM cours c
//       JOIN enseignants ens ON c.enseignant_id = ens.id
//       JOIN inscriptions i ON i.cours_id = c.id
//       WHERE i.etudiant_id = ? AND i.statut_paiement = 'payé'
//     `, [etudiant_id]);

//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur récupération cours achetés', error: err.message });
//   }
// };

exports.getCoursAchetesParEtudiant = async (req, res) => {
  const etudiant_id = req.user.id;

  try {
    // 1. Récupérer les cours achetés
    const [cours] = await pool.execute(`
      SELECT c.id, c.titre, c.description, c.prix, c.img_url,c.date_de_creation, ens.nom AS enseignant
      FROM cours c
      JOIN enseignants ens ON c.enseignant_id = ens.id
      JOIN inscriptions i ON i.cours_id = c.id
      WHERE i.etudiant_id = ? AND i.statut_paiement = 'payé'
    `, [etudiant_id]);

    const coursIds = cours.map(c => c.id);
    if (coursIds.length === 0) return res.json([]); // Aucun cours ? Retourner vide

    // 2. Récupérer les chapitres associés aux cours achetés
    const [chapitres] = await pool.query(`
      SELECT c.id, c.titre, c.description, c.img_url,c.date_de_creation, c.ordre, c.cours_id, IFNULL(ec.status, 'non_commence') AS status
      FROM chapitres AS c
      LEFT JOIN etudiant_chapitre ec ON ec.id_chapitre = c.id AND ec.id_etudiant = ?
      WHERE c.cours_id IN (?)
      ORDER BY ordre ASC
    `, [etudiant_id,coursIds]);

    // 3. Regrouper les chapitres par cours
    const coursAvecChapitres = cours.map(c => ({
      ...c,
      chapitres: chapitres
        .filter(ch => ch.cours_id === c.id)
        .map(({ cours_id, ...chapitre }) => chapitre) // ⛔️ Supprimer cours_id de chaque chapitre
    }));

    res.json(coursAvecChapitres);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération cours achetés', error: err.message });
  }
};
