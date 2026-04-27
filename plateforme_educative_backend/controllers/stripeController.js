// 📁 controllers/stripeController.js
const stripe = require('../config/stripe');
const pool = require('../config/db');

// ✅ Créer une session de paiement Stripe
exports.createCheckoutSession = async (req, res) => {
  const { cours_id } = req.body;
  const etudiant_id = req.user.id;


  try {
   


    const [[cours]] = await pool.execute(
      'SELECT * FROM cours WHERE id = ?',
      [cours_id]
    );
    if (!cours) return res.status(404).json({ message: 'Cours non trouvé' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: req.user.email,
      
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: cours.titre,
            },
            unit_amount: parseInt(cours.prix * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONT_URL_D}/paiement-success?cours_id=${cours.id}`,
      cancel_url: `${process.env.FRONT_URL_D}/paiement-annule`,
      metadata: {
        etudiant_id,
        cours_id
      }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: 'Erreur Stripe', error: err.message });
  }
};

exports.confirmerPaiementEtInscription = async (req, res) => {
  const { cours_id } = req.body;
  const etudiant_id = req.user.id;


  try {
    const [existing] = await pool.execute(
      'SELECT * FROM inscriptions WHERE etudiant_id = ? AND cours_id = ?',
      [etudiant_id, cours_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Déjà inscrit à ce cours' }); // ✅ important !
    }

    await pool.execute(
      `INSERT INTO inscriptions (etudiant_id, cours_id, statut_paiement) VALUES (?, ?, 'payé')`,
      [etudiant_id, cours_id]
    );

    res.json({ message: 'Paiement confirmé et étudiant inscrit' });
  } catch (err) {
    console.error("Erreur serveur confirmerPaiement:", err);
    res.status(500).json({ message: 'Erreur inscription', error: err.message });
  }
};
