// controllers/questionController.js
const pool = require('../config/db');

//  Créer une question (enseignant)
exports.ajouterQuestion = async (req, res) => {
  const { chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse } = req.body;
  try {
    if (
      !chapitre_id ||
      !texte_question ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d ||
      !bonne_reponse
    ) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }
    await pool.execute(
      `INSERT INTO questions (chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [chapitre_id, texte_question, option_a, option_b, option_c, option_d, bonne_reponse]
    );
    res.status(201).json({ message: 'Question ajoutée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur', error: err.message });
  }
};

// Récupérer toutes les questions d’un chapitre (enseignant)
exports.getQuestionsByChapitre = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM questions WHERE chapitre_id = ? ORDER BY id ASC`,
      [chapitre_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

//  Mettre à jour une question (enseignant)
exports.updateQuestion = async (req, res) => {
  const question_id = req.params.id;
  const { texte_question, option_a, option_b, option_c, option_d, bonne_reponse } = req.body;
  try {
    await pool.execute(
      `UPDATE questions SET texte_question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, bonne_reponse = ? WHERE id = ?`,
      [texte_question, option_a, option_b, option_c, option_d, bonne_reponse, question_id]
    );
    res.json({ message: 'Question mise à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

//  Supprimer une question (enseignant)
exports.deleteQuestion = async (req, res) => {
  const question_id = req.params.id;
  try {
    await pool.execute(`DELETE FROM questions WHERE id = ?`, [question_id]);
    res.json({ message: 'Question supprimée' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};



exports.getQuestionsForTest = async (req, res) => {
  const chapitre_id = req.params.chapitre_id;

  try {
    const [questions] = await pool.execute(
      `SELECT * FROM questions WHERE chapitre_id = ?`,
      [chapitre_id]
    );

    const formatted = questions.map((q) => {
      // 1. Toutes les options
      let allOptions = [
        { label: 'A', value: q.option_a },
        { label: 'B', value: q.option_b },
        { label: 'C', value: q.option_c },
        { label: 'D', value: q.option_d },
      ].filter(opt => opt.value != null && opt.value.trim() !== '');

      // 2. Supprimer les doublons de valeur
      const seen = new Set();
      allOptions = allOptions.filter(opt => {
        if (seen.has(opt.value)) return false;
        seen.add(opt.value);
        return true;
      });

      // 3. Trouver la bonne réponse
      const bonneReponseLabel = q.bonne_reponse.toUpperCase();
      const bonneOption = allOptions.find(opt => opt.label.toUpperCase() === bonneReponseLabel);

      if (!bonneOption) return null; // Skip question si bonne réponse introuvable

      // 4. Prendre 2 autres options aléatoires ≠ bonne
      const autresOptions = allOptions.filter(opt => opt.label !== bonneOption.label);
      const mauvaises = autresOptions.sort(() => Math.random() - 0.5).slice(0, 2);

      // 5. Ajouter la bonne et mélanger
      const finalOptions = [...mauvaises, bonneOption].sort(() => Math.random() - 0.5);

      return {
        id: q.id,
        texte_question: q.texte_question,
        options: finalOptions
      };
    }).filter(q => q !== null); // enlever les questions invalides

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
