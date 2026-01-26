const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function insertEtudiants() {
  try {
    const hashed = await bcrypt.hash('aaaa1111', 10);

    const etudiants = [
      ['Yassine Karim', 'yassine.karim01@gmail.com', hashed, '2001-03-12', '2023-09-01', '14 avenue des Jasmins, Lyon'],
      ['Salma Benali', 'salma.benali24@gmail.com', hashed, '2002-06-25', '2023-09-01', '22 rue des Lilas, Toulouse'],
      ['Mohamed Amine', 'amine.mohamed88@gmail.com', hashed, '1999-11-03', '2023-09-01', '7 boulevard Victor Hugo, Nice'],
      ['Sara Messaoudi', 'sara.messaoudi@gmail.com', hashed, '2000-07-19', '2023-09-01', '18 rue de la République, Paris'],
      ['Rachid El Fassi', 'rachid.elfassi@gmail.com', hashed, '1998-02-10', '2023-09-01', '29 rue Nationale, Lille'],
      ['Imane Ait Taleb', 'imane.ait@gmail.com', hashed, '2003-04-17', '2023-09-01', '9 rue Jean Jaurès, Montpellier'],
      ['Nabil Ouchene', 'nabil.ouchene@gmail.com', hashed, '2001-09-22', '2023-09-01', '15 avenue Charles de Gaulle, Nantes'],
      ['Layla Haddad', 'layla.haddad@gmail.com', hashed, '2000-05-30', '2023-09-01', '33 rue Paul Valéry, Strasbourg'],
      ['Hamza Bouzid', 'hamza.bouzid@gmail.com', hashed, '1997-12-14', '2023-09-01', '41 rue des Écoles, Rennes'],
      ['Kenza Bakkali', 'kenza.bakkali@gmail.com', hashed, '2002-10-08', '2023-09-01', '6 rue Lafayette, Bordeaux'],
    ];

    for (const etudiant of etudiants) {
      await pool.execute(
        `INSERT INTO etudiants (nom, email, mot_de_passe, date_naissance, date_inscription_ecole, adress) VALUES (?, ?, ?, ?, ?, ?)`,
        etudiant
      );
    }

    console.log('✅ 10 étudiants insérés avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur insertion étudiants :', error.message);
    process.exit(1);
  }
}

insertEtudiants();
