// 📁 scripts/insertAdmins.js
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function insertAdmins() {
  try {
    const hashedPassword = await bcrypt.hash('admin1234', 10);

    const admins = [
      ['Sophie Moreau', 'sophie.moreau@plateforme.com', hashedPassword],
      ['Ali Mansouri', 'ali.mansouri@plateforme.com', hashedPassword],
      ['Julie Bernard', 'julie.bernard@plateforme.com', hashedPassword],
      ['Rachid El Idrissi', 'rachid.elidrissi@plateforme.com', hashedPassword],
      ['Claire Dubois', 'claire.dubois@plateforme.com', hashedPassword],
    ];

    for (const [nom, email, mot_de_passe] of admins) {
      await pool.execute(
        `INSERT INTO admins (nom, email, mot_de_passe) VALUES (?, ?, ?)`,
        [nom, email, mot_de_passe]
      );
    }

    console.log('✅ 5 administrateurs insérés avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors de l’insertion des administrateurs :', error.message);
    process.exit(1);
  }
}

insertAdmins();
