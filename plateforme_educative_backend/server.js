// 📁 server.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const coursRoutes = require('./routes/coursRoutes');
const chapitreRoutes = require('./routes/chapitreRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reponseRoutes = require('./routes/reponseRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const progressionRoutes = require('./routes/progressionRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const enseignantRoutes = require('./routes/enseignantRoutes');
// const examensRoutes = require('./routes/examensRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const videoRoutes = require('./routes/videoRoutes');


// ✅ autoriser les requêtes cross-origin
app.use(cors({
  origin: 'http://localhost:5173', // ou ton vrai frontend (Netlify, etc.)
  credentials: true, // si tu utilises des cookies
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cours', coursRoutes);
app.use('/api/enseignants', enseignantRoutes);
app.use('/api/chapitres', chapitreRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reponses', reponseRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/progression', progressionRoutes);
app.use('/api/stripe', stripeRoutes);
// app.use('/api/examens', examensRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api', videoRoutes);

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
