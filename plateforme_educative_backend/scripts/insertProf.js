// 📁 scripts/insertProfs.js
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function insertProfs() {
  try {
    const hashed = await bcrypt.hash('code1234', 10);

    const profs = [
      ['Jean Martin', 'jean.martin@gmail.com', hashed, '1980-09-10', '5 avenue Riyad, Fès'],
      ['Amina Rahmouni', 'amina.rahmouni@gmail.com', hashed, '1978-04-22', '13 rue Zerktouni, Casablanca'],
      ['Youssef El Amrani', 'youssef.elamrani@gmail.com', hashed, '1985-06-15', '22 avenue Hassan II, Rabat'],
      ['Karim Daoudi', 'karim.daoudi@gmail.com', hashed, '1979-11-03', '8 rue des Écoles, Marrakech'],
      ['Nadia Bennis', 'nadia.bennis@gmail.com', hashed, '1982-02-27', '19 boulevard Mohammed V, Tanger'],
      ['Hicham Ait Hadi', 'hicham.aithadi@gmail.com', hashed, '1975-08-30', '16 rue Moulay Idriss, Agadir'],
      ['Samira Lahcen', 'samira.lahcen@gmail.com', hashed, '1983-12-09', '12 avenue Atlas, Oujda'],
      ['Omar Chraibi', 'omar.chraibi@gmail.com', hashed, '1981-05-19', '7 rue Ibn Sina, Meknès'],
      ['Fatima Zahra Idrissi', 'fatima.idrissi@gmail.com', hashed, '1986-07-11', '28 avenue Annakhil, Salé'],
      ['Mohamed Tahiri', 'mohamed.tahiri@gmail.com', hashed, '1984-03-17', '3 rue Al Qods, Tétouan'],
    ];

    for (const prof of profs) {
      await pool.execute(
        `INSERT INTO enseignants (nom, email, mot_de_passe, date_naissance, adress) VALUES (?, ?, ?, ?, ?)`,
        prof
      );
    }

    console.log('✅ 10 enseignants insérés avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur insertion enseignants :', error.message);
    process.exit(1);
  }
}

insertProfs();
