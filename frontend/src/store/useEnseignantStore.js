import { create } from 'zustand';
import  {axiosInstance}  from '../utils/axios'
import { toast } from 'react-hot-toast';

const useEnseignantStore = create((set, get) => ({
  isLoading: false,
  cours: [],
  chapitres: [],
  questions: [],
  etudiantsInscrits: [],
  tousEtudiants: [],

  // 🔄 Tous les cours
  fetchMesCours: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get('/enseignants/mes-cours');
      set({ cours: res.data });
    } catch (error) {
      toast.error("Erreur lors du chargement des cours");
      console.error('fetchMesCours:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ➕ Ajouter un cours
  addCours: async (data) => {
    try {
      set({ isLoading: true });
      await axiosInstance.post('/cours', data);
      toast.success("Cours ajouté !");
      await get().fetchMesCours();
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ✏️ Modifier un cours
  updateCours: async (id, data) => {
    try {
      set({ isLoading: true });
      await axiosInstance.put(`/cours/${id}`, data);
      toast.success("Cours mis à jour !");
      await get().fetchMesCours();
    } catch (error) {
      toast.error("Erreur de mise à jour");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ❌ Supprimer un cours
  deleteCours: async (id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/cours/${id}`);
      toast.success("Cours supprimé !");
      await get().fetchMesCours();
    } catch (error) {
      toast.error("Erreur suppression cours");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMesCoursAvecChapitres: async () => {
  try {
    set({ isLoading: true });
    const res = await axiosInstance.get('/enseignants/mes-cours-avec-chapitres');
    set({ cours: res.data });
  } catch (error) {
    toast.error("Erreur lors du chargement des chapitres");
    console.error(error);
  } finally {
    set({ isLoading: false });
  }
},


  // 📄 Chapitres d’un cours
  fetchChapitres: async (cours_id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/chapitres/cours/${cours_id}`);
      set({ chapitres: res.data });
    } catch (error) {
      // toast.error("Erreur chargement chapitres");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addChapitre: async (data) => {
    try {
      set({ isLoading: true });
      await axiosInstance.post('/chapitres', data);
      toast.success("Chapitre ajouté !");
      await get().fetchChapitres(data.cours_id);
    } catch (error) {
      toast.error("Erreur ajout chapitre");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteChapitre: async (id, cours_id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/chapitres/${id}`);
      toast.success("Chapitre supprimé !");
      await get().fetchChapitres(cours_id);
    } catch (error) {
      toast.error("Erreur suppression chapitre");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 📋 Questions
  fetchQuestions: async (chapitreId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/questions/by-chapitre/${chapitreId}`);
      set({ questions: res.data });
    } catch (error) {
      // toast.error("Erreur chargement questions");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addQuestion: async (data) => {
    try {
      set({ isLoading: true });
     await axiosInstance.post('/questions', data);
      toast.success("Question ajoutée !");
      await get().fetchQuestions(data.chapitre_id);
    } catch (error) {
      toast.error(error.response?.data?.message ||"Erreur ajout question");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuestion: async (id, data) => {
    try {
      set({ isLoading: true });
      await axiosInstance.put(`/questions/${id}`, data);
      toast.success("Question mise à jour !");
      await get().fetchQuestions(data.chapitre_id);
    } catch (error) {
      toast.error("Erreur mise à jour question");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteQuestion: async (id, chapitre_id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/questions/${id}`);
      toast.success("Question supprimée !");
      await get().fetchQuestions(chapitre_id);
    } catch (error) {
      toast.error("Erreur suppression question");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 👨‍🎓 Étudiants inscrits
  fetchTousMesEtudiants: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get('/enseignants/etudiants-inscrits');
      set({ etudiantsInscrits: res.data });
    } catch (error) {
      toast.error("Erreur chargement étudiants");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTousLesEtudiants: async () => {
  try {
    set({ isLoading: true });
    const res = await axiosInstance.get('/enseignants/tous-les-etudiants');
    set({ tousEtudiants: res.data });
  } catch (error) {
    toast.error("Erreur lors du chargement des étudiants");
    console.error(error);
  } finally {
    set({ isLoading: false });
  }
}
}));

export default useEnseignantStore;
