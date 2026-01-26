const pool = require('../config/db');

// ✅ Marquer un chapitre comme terminé par un étudiant
exports.terminerChapitre = async (req, res) => {
  const etudiant_id = req.user.id;
  const chapitre_id = req.params.chapitre_id;

  try {
    console.log("🔄 Étape 1 : Marquage du chapitre comme terminé");

    // 1. Marquer le chapitre comme terminé (insert ou update)
    await pool.execute(
      `INSERT INTO etudiant_chapitre (id_etudiant, id_chapitre, status)
       VALUES (?, ?, 'termine')
       ON DUPLICATE KEY UPDATE status = 'termine'`,
      [etudiant_id, chapitre_id]
    );

    console.log("✅ Chapitre marqué comme terminé");

    // 2. Récupérer le cours associé au chapitre
    const [[chapitre]] = await pool.execute(
      `SELECT cours_id FROM chapitres WHERE id = ?`,
      [chapitre_id]
    );
    if (!chapitre) return res.status(404).json({ message: "Chapitre introuvable" });

    const cours_id = chapitre.cours_id;

    console.log("🔄 Étape 2 : Cours associé au chapitre => ID :", cours_id);

    // 3. Nombre total de chapitres dans ce cours
    const [[{ total_chapitres }]] = await pool.execute(
      `SELECT COUNT(*) AS total_chapitres FROM chapitres WHERE cours_id = ?`,
      [cours_id]
    );

    // 4. Nombre de chapitres terminés par l’étudiant dans ce cours
    const [[{ chapitres_termines }]] = await pool.execute(
      `SELECT COUNT(*) AS chapitres_termines
       FROM etudiant_chapitre ec
       JOIN chapitres c ON ec.id_chapitre = c.id
       WHERE ec.id_etudiant = ? AND c.cours_id = ? AND ec.status = 'termine'`,
      [etudiant_id, cours_id]
    );

    // 5. Calcul de la progression
    const progression = total_chapitres > 0
      ? parseFloat(((chapitres_termines / total_chapitres) * 100).toFixed(2))
      : 0;

    console.log(`📊 Progression calculée : ${progression}%`);

    // 6. Mettre à jour ou insérer dans etudiant_cours
    await pool.execute(
      `INSERT INTO etudiant_cours (id_etudiant, id_cours, progression, status)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE progression = ?, status = ?`,
      [
        etudiant_id,
        cours_id,
        progression,
        progression >= 100 ? 'termine' : 'en_cours',
        progression,
        progression >= 100 ? 'termine' : 'en_cours',
      ]
    );

    console.log("✅ Mise à jour de la table etudiant_cours");

    return res.json({ message: 'Chapitre terminé', progression: `${progression}%` });
  } catch (err) {
    console.error("❌ Erreur serveur dans terminerChapitre:", err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// ✅ Récupérer la progression globale par cours
exports.getProgressionGlobale = async (req, res) => {
  const etudiant_id = req.user.id;

  try {
    const [rows] = await pool.execute(
      `SELECT ec.id_cours, c.titre, ec.progression, ec.status
       FROM etudiant_cours ec
       JOIN cours c ON ec.id_cours = c.id
       WHERE ec.id_etudiant = ?`,
      [etudiant_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération progression', error: err.message });
  }
};

// ✅ Voir le statut de chaque chapitre dans un cours
exports.getChapitresAvecStatut = async (req, res) => {
  const etudiant_id = req.user.id;
  const cours_id = req.params.cours_id;

  try {
    const [rows] = await pool.execute(
      `SELECT c.id AS chapitre_id, c.titre, IFNULL(ec.status, 'non_commence') AS status
       FROM chapitres c
       LEFT JOIN etudiant_chapitre ec ON ec.id_chapitre = c.id AND ec.id_etudiant = ?
       WHERE c.cours_id = ?
       ORDER BY c.ordre ASC`,
      [etudiant_id, cours_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération chapitres', error: err.message });
  }
};
