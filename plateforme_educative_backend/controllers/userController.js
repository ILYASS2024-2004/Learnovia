// 📁 controllers/userController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Utilitaire pour choisir la bonne table
const TABLES = {
  etudiant: 'etudiants',
  enseignant: 'enseignants',
  admin: 'admins',
};

// 🔄 CRUD Générique
exports.getAll = (role) => async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${TABLES[role]}`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.getOne = (role) => async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${TABLES[role]} WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.create = (role) => async (req, res) => {
  try {
    const { nom, email, mot_de_passe, date_naissance, adress } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: 'Format email invalide' });
}
if (!passwordRegex.test(mot_de_passe)) {
  return res.status(400).json({
    message: 'Mot de passe invalide : au moins 8 caractères avec lettres et chiffres'
  });
}
    const hash = await bcrypt.hash(mot_de_passe, 10);
    await pool.execute(
      `INSERT INTO ${TABLES[role]} (nom, email, mot_de_passe, date_naissance, adress) VALUES (?, ?, ?, ?, ?)`,
      [nom, email, hash, date_naissance, adress]
    );
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.update = (role) => async (req, res) => {
  try {
    const { nom, email, date_naissance, adress } = req.body;
    await pool.execute(
      `UPDATE ${TABLES[role]} SET nom = ?, email = ?, date_naissance = ?, adress = ? WHERE id = ?`,
      [nom, email, date_naissance, adress, req.params.id]
    );
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.remove = (role) => async (req, res) => {
  try {
    await pool.execute(`DELETE FROM ${TABLES[role]} WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
