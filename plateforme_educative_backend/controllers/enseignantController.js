const pool = require('../config/db');

//  Tous les cours créés par l'enseignant connecté
exports.getMesCours = async (req, res) => {
  const enseignant_id = req.user.id;

  try {
    const [cours] = await pool.execute(
      'SELECT * FROM cours WHERE enseignant_id = ?',
      [enseignant_id]
    );

    // Pour chaque cours, ajouter les étudiants inscrits
    const coursAvecEtudiants = await Promise.all(cours.map(async (coursItem) => {
      const [etudiants] = await pool.execute(
        `SELECT e.id, e.nom, e.email,i.date_inscription
         FROM inscriptions i
         JOIN etudiants e ON e.id = i.etudiant_id
         WHERE i.cours_id = ? AND i.statut_paiement = 'payé'`,
        [coursItem.id]
      );
      return {
        ...coursItem,
        etudiants,
      };
    }));

    res.json(coursAvecEtudiants);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};


exports.getMesEtudiantsInscrits = async (req, res) => {
  const enseignantId = req.user.id;

  try {
    const [rows] = await pool.execute(`
      SELECT 
        e.id AS etudiant_id, 
        e.nom, 
        e.email, 
        c.id AS cours_id, 
        c.titre AS cours_titre,
        c.img_url,
        i.date_inscription
      FROM inscriptions i
      JOIN etudiants e ON e.id = i.etudiant_id
      JOIN cours c ON c.id = i.cours_id
      WHERE c.enseignant_id = ? AND i.statut_paiement = 'payé'
    `, [enseignantId]);

    // 🧠 Regrouper les cours par étudiant
    const etudiantsMap = new Map();

    rows.forEach(row => {
      if (!etudiantsMap.has(row.etudiant_id)) {
        etudiantsMap.set(row.etudiant_id, {
          id: row.etudiant_id,
          nom: row.nom,
          email: row.email,
          cours: [],
        });
      }

      etudiantsMap.get(row.etudiant_id).cours.push({
        id: row.cours_id,
        img:row.img_url,
        titre: row.cours_titre,
        date:row.date_inscription,

      });
    });

    const result = Array.from(etudiantsMap.values());
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
exports.getMesCoursAvecChapitres = async (req, res) => {
  const enseignant_id = req.user.id;

  try {
    // Récupère tous les cours du prof
    const [cours] = await pool.execute(
      'SELECT * FROM cours WHERE enseignant_id = ?',
      [enseignant_id]
    );

    // Pour chaque cours, récupérer les chapitres associés
    const coursAvecChapitres = await Promise.all(
      cours.map(async (coursItem) => {
        const [chapitres] = await pool.execute(
          'SELECT * FROM chapitres WHERE cours_id = ? ORDER BY ordre ASC',
          [coursItem.id]
        );
        return {
          ...coursItem,
          chapitres,
        };
      })
    );

    res.json(coursAvecChapitres);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getTousLesEtudiants = async (req, res) => {
  try {
    const [etudiants] = await pool.query('SELECT id, nom, email FROM etudiants');
    res.json(etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des étudiants." });
  }
};

