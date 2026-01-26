// 📁 store/useExamenStore.js
import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import { toast } from 'react-hot-toast';

const useExamenStore = create((set, get) => ({
  examens: [],
  isLoading: false,

  // 🔄 Récupérer les examens (enseignant)
  fetchExamens: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get('/examens');
      set({ examens: res.data });
    } catch (error) {
      toast.error("Erreur chargement des examens");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 👨‍🎓 Récupérer les examens d'un étudiant
  fetchExamensEtudiant: async (etudiantId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/examens/etudiant/${etudiantId}`);
      set({ examens: res.data });
    } catch (error) {
      toast.error("Erreur chargement des notes");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ➕ Ajouter une note d'examen
  ajouterExamen: async (data) => {
    try {
      set({ isLoading: true });
      await axiosInstance.post('/examens', data);
      toast.success("Note ajoutée avec succès");
      await get().fetchExamens();
    } catch (error) {
      toast.error(error.response?.data?.message ||"Erreur ajout note");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 🔄 Modifier une note
  modifierExamen: async (id, note) => {
    try {
      set({ isLoading: true });
      await axiosInstance.put(`/examens/${id}`, { note });
      toast.success("Note modifiée");
      await get().fetchExamens();
    } catch (error) {
      toast.error("Erreur modification");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ❌ Supprimer une note
  supprimerExamen: async (id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/examens/${id}`);
      toast.success("Note supprimée");
      await get().fetchExamens();
    } catch (error) {
      toast.error("Erreur suppression");
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useExamenStore;
