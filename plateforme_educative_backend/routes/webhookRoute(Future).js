// //  routes/stripeWebhook.js
// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const pool = require('../config/db');

// router.post('/webhook-stripe', express.raw({ type: 'application/json' }), async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.log('Erreur webhook:', err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//     const etudiant_id = session.metadata.etudiant_id;
//     const cours_id = session.metadata.cours_id;

//     // ✅ Vérifier si l’étudiant est déjà inscrit
//     const [existing] = await pool.execute(
//       'SELECT * FROM inscriptions WHERE etudiant_id = ? AND cours_id = ?',
//       [etudiant_id, cours_id]
//     );

//     if (existing.length === 0) {
//       await pool.execute(
//         'INSERT INTO inscriptions (etudiant_id, cours_id, statut_paiement) VALUES (?, ?, ?)',
//         [etudiant_id, cours_id, 'payé']
//       );
//       console.log(`Étudiant ${etudiant_id} inscrit au cours ${cours_id}`);
//     }
//   }

//   res.json({ received: true });
// });

// module.exports = router;
