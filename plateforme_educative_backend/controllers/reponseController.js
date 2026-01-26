// 📁 controllers/reponseController.js
const pool = require('../config/db');

// ✅ L'étudiant soumet plusieurs réponses pour un chapitre
exports.soumettreReponsesChapitre = async (req, res) => {
  const reponses = req.body;
  const chapitre_id = req.params.chapitre_id;
  const etudiant_id = req.user.id;

  try {
    const [questions] = await pool.execute(
      `SELECT id, bonne_reponse FROM questions WHERE chapitre_id = ?`,
      [chapitre_id]
    );

    let bonnes = 0;
    const feedback = [];

    for (let rep of reponses) {
      const question = questions.find(q => q.id === rep.question_id);
      if (!question) continue;

      const reponseEtudiant = rep.reponse_donnee?.toLowerCase();
      const bonneReponse = question.bonne_reponse?.toLowerCase();

      const est_correct = reponseEtudiant === bonneReponse ? 1 : 0;
      if (est_correct) bonnes++;

      await pool.execute(
        `INSERT INTO reponses (question_id, etudiant_id, reponse_donnee, est_correct)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE reponse_donnee = ?, est_correct = ?`,
        [rep.question_id, etudiant_id, rep.reponse_donnee, est_correct, rep.reponse_donnee, est_correct]
      );

      feedback.push({
        question_id: rep.question_id,
        reponse_donnee: rep.reponse_donnee,
        bonne_reponse: question.bonne_reponse,
        est_correct
      });
    }

    const total = questions.length;
    const score = Math.round((bonnes / total) * 100);

    res.json({ score, total, bonnes, details: feedback });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// 📁 reponseController.js
exports.soumettreReponseUnique = async (req, res) => {
  const { question_id, reponse_donnee } = req.body;
  const etudiant_id = req.user.id;

  try {
    const [[question]] = await pool.execute(`SELECT bonne_reponse FROM questions WHERE id = ?`, [question_id]);
    if (!question) return res.status(404).json({ message: 'Question non trouvée' });

const est_correct = rep.reponse_donnee.toLowerCase() === question.bonne_reponse.toLowerCase() ? 1 : 0;


    await pool.execute(
      `INSERT INTO reponses (question_id, etudiant_id, reponse_donnee, est_correct)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE reponse_donnee = ?, est_correct = ?`,
      [question_id, etudiant_id, reponse_donnee, est_correct, reponse_donnee, est_correct]
    );

    res.json({ est_correct });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
