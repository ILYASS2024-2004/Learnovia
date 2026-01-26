// 📁 store/useEtudiantStore.js
import { create } from 'zustand';
import { axiosInstance } from '../utils/axios'; // Assurez-vous que le chemin est correct

import toast from 'react-hot-toast';

const useEtudiantStore = create((set) => ({
  coursPayes: [],
  coursDisponibles: [],
  progression: [],
  chapitresAvecStatut: [],
  notifications: [],
  examens: [],
enseignants: [],
  isLoading: false,

fetchEnseignants: async () => {
  try {
    set({ isLoading: true });
    const res = await axiosInstance.get('/etudiants/enseignants');
    set({ enseignants: res.data });
  } catch (err) {
    console.error('Erreur fetch enseignants', err);
  } finally {
    set({ isLoading: false });
  }
},

  /// ✅ Cours achetés par l'étudiant
fetchMesCours: async () => {
  try {
    set({ isLoading: true });
    const res = await axiosInstance.get('/cours/achetes'); // ✅ correspond bien à la nouvelle route
    set({ coursPayes: res.data });
  } catch (err) {
    toast.error("Erreur chargement cours payés");
    console.error(err);
  } finally {
    set({ isLoading: false });
  }
},


  // ✅ Tous les cours disponibles (non achetés)
fetchCoursDisponibles: async () => {
  try {
    set({ isLoading: true });
    const res = await axiosInstance.get('/cours/disponibles'); // ✅ correct
    set({ coursDisponibles: res.data });
  } catch (err) {
    toast.error("Erreur chargement cours disponibles");
    console.error(err);
  } finally {
    set({ isLoading: false });
  }
},


  // ✅ Voir progression globale
  fetchProgressionGlobale: async () => {
    try {
      const res = await axiosInstance.get('/progression/cours');
      set({ progression: res.data });
    } catch (err) {
      toast.error("Erreur progression cours");
        console.error(err);
    }
  },

  // ✅ Voir progression des chapitres d’un cours
  fetchChapitresAvecStatut: async (cours_id) => {
    try {
      const res = await axiosInstance.get(`/progression/cours/${cours_id}/chapitres`);
      set({ chapitresAvecStatut: res.data });
    } catch (err) {
      toast.error("Erreur progression chapitres");
        console.error(err);
    }
  },

  // ✅ Voir ses notes
  fetchMesExamens: async (etudiantId) => {
    try {
      const res = await axiosInstance.get(`/examens/etudiant/${etudiantId}`);
      set({ examens: res.data });
    } catch (err) {
      toast.error("Erreur chargement des notes");
        console.error(err);
    }
  },

  // ✅ Voir ses notifications
  fetchNotifications: async () => {
    try {
      const res = await axiosInstance.get('/notifications');
      set({ notifications: res.data });
    } catch (err) {
      toast.error("Erreur chargement notifications");
        console.error(err);
    }
  },

  // ✅ Envoyer un message à un professeur
  envoyerMessage: async (enseignant_id, texte) => {
    try {
      await axiosInstance.post('/messages', { enseignant_id, texte });
      toast.success("Message envoyé");
    } catch (err) {
      toast.error("Erreur envoi message");
        console.error(err);
    }
  },

  // ✅ Marquer un chapitre comme terminé
  marquerChapitreTermine: async (chapitre_id) => {
    try {
      await axiosInstance.post(`/progression/chapitre/${chapitre_id}/terminer`);
      await useEtudiantStore.getState().fetchProgressionGlobale();
    } catch (err) {
      toast.error("Erreur progression chapitre");
        console.error(err);
    }
  },

  // ✅ Soumettre réponses d'un chapitre
  soumettreTestChapitre: async (chapitre_id, reponses) => {
    try {
      const res = await axiosInstance.post(`/reponses/chapitre/${chapitre_id}`, reponses);
      return res.data; // { score, bonnes, total, details: [] }
    } catch (err) {
      toast.error("Erreur envoi test");
        console.error(err);
    }
  },

  // ✅ Acheter un cours via Stripe
  acheterCours: async (cours_id) => {
    try {
      const res = await axiosInstance.post('/stripe/create-checkout-session', { cours_id });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Erreur lors de la redirection vers Stripe");
        console.error(err);
    }
  },

  // ✅ Récupérer un chapitre avec ou sans contenu (selon inscription)
fetchChapitreParId: async (chapitre_id) => {
  try {
    const res = await axiosInstance.get(`/chapitres/${chapitre_id}`);
    return res.data; // retourne { id, titre, contenu?, ... }
  } catch (err) {
    console.error("Erreur récupération chapitre", err);
    return null;
  }
},


  // ✅ Confirmer inscription après paiement Stripe
confirmerPaiement: async (cours_id) => {
  try {
    await axiosInstance.post('/stripe/confirmer-paiement', { cours_id: Number(cours_id) });
    toast.success("Cours acheté avec succès");
  } catch (err) {
    toast.error("Erreur confirmation paiement");
    console.error(err);
  }
},

fetchQuestionsChapitre: async (chapitre_id) => {
  try {
    const res = await axiosInstance.get(`/questions/${chapitre_id}`);
    return res.data; // ✅ important
  } catch (err) {
    toast.error("Erreur chargement questions");
    console.error(err);
    return [];
  }
},



}));

export default useEtudiantStore;
